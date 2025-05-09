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

  totalCalories = 0;
  totalProteins = 0;

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
      this.totalCalories = 0;
      this.totalProteins = 0;
      this.items = [...state.items];
      this.items.forEach(item => {
        this.totalCalories = this.totalCalories + item.fact.calories;
        this.totalProteins = this.totalProteins + item.fact.protein;
      });
    });
  }


  ngOnDestroy(): void {
    this.calculateSub.unsubscribe();
  }
}
