import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe, DecimalPipe, KeyValuePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

import { CoreBtnComponent, CoreControlComponent } from '@/material/components';
import { AppState } from '@/app.reducer';
import { selectNutritionCalculate, CalculatateState } from '@/nutrition/state/nutrition.reducer';
import { removeFromCalculate } from '@/nutrition/state/nutrition.actions';
import { NutritionItem } from '@/nutrition/types';

interface CalculatedItem {
  item: NutritionItem;
  control: FormControl;
  calories: number;
  proteins: number;
}

@Component({
  selector: 'dashboard-calculator',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe,
    CoreBtnComponent,
    CoreControlComponent
  ],
  templateUrl: './dashboard-calculator.component.html',
  styleUrl: './dashboard-calculator.component.scss'
})
export class DashboardCalculatorComponent implements OnInit, OnDestroy {
  calculate$: Observable<CalculatateState>;
  calculateSub!: Subscription;

  items: NutritionItem[] = [];
  itemsMap: any = {};
  controls: any= {};
  controlsSub: any= {};

  totalCalories = 0;
  totalProteins = 0;
  calculated: CalculatedItem[] = [];

  constructor(
    private readonly store: Store<AppState>
  ) {
    this.calculate$ = this.store.select(selectNutritionCalculate);
  }

  onRemoveItem(item: NutritionItem) {
    this.store.dispatch(removeFromCalculate({ item }));
  }

  ngOnInit(): void {
    this.calculateSub = this.calculate$.subscribe(state => {
      this.calculate(state.items);
    });
  }

  calculate(items: NutritionItem[]) {
    this.totalCalories = 0;
    this.totalProteins = 0;
    this.calculated = [];

    items.forEach(item => {
      const control = new FormControl(100);
      this.controls[item._id] = control;
      this.controlsSub = control.valueChanges.subscribe((value) => {
        this.update(item, value || 0)
      });
      this.calculated.push({
        item,
        control,
        calories: item.fact.calories,
        proteins: item.fact.protein,
      });
      this.totalCalories = this.totalCalories + item.fact.calories;
      this.totalProteins = this.totalProteins + item.fact.protein;
    })
  }

  update(item: NutritionItem, value: any) {
    let amount;

    if(!value) {
      amount = 0;
    } else if(typeof value === 'string') {
      amount = parseFloat(value);
    }

    this.calculated = this.calculated.map(c => {
      if(c.item._id !== item._id) return c;
      const calories = (c.control.value * c.item.fact.calories)/100;
      const proteins = (c.control.value * c.item.fact.protein)/100;
      this.totalCalories = (this.totalCalories - item.fact.calories) + calories;
      this.totalProteins = (this.totalProteins - item.fact.protein) + proteins;
      return {
        ...c,
        calories,
        proteins,
      }
    });
  }

  ngOnDestroy(): void {
    this.calculateSub.unsubscribe();
  }
}
