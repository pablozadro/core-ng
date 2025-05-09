import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgStyle } from '@angular/common';
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

interface CalculateTotals {
  calories: number;
  proteins: number;
}

@Component({
  selector: 'dashboard-calculator',
  standalone: true,
  imports: [
    NgStyle,
    AsyncPipe,
    DecimalPipe,
    CoreBtnComponent,
    CoreControlComponent
  ],
  templateUrl: './dashboard-calculator.component.html',
  styleUrl: './dashboard-calculator.component.scss'
})
export class DashboardCalculatorComponent implements OnInit, OnDestroy {
  readonly redColor = 'rgb(206, 32, 32)';
  readonly yellowColor = 'rgb(202, 236, 9)';
  readonly greenColor = 'rgb(0, 255, 21)';
  calculate$: Observable<CalculatateState>;
  calculateSub!: Subscription;
  
  calculated: CalculatedItem[] = [];
  totals: CalculateTotals = {
    calories: 0,
    proteins: 0,
  }

  controls: any = {};

  targetCalories = new FormControl(2000);
  targetProteins = new FormControl(133);
  targets = {
    calories: {
      value: 0,
      bkg: 'rgb(255,0,0)'
    },
    proteins: {
      value: 0,
      bkg: 'rgb(255,0,0)'
    }
  }

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
      this.calculated = this.getCalculated(state.items);
      this.totals = this.getTotals(this.calculated);
      this.targets = this.getTargets();
    });
    this.targetCalories.valueChanges.subscribe(value => {
      this.targets = this.getTargets();
    })
    this.targetProteins.valueChanges.subscribe(value => {
      this.targets = this.getTargets();
    })
  }

  getTargets() {
    let caloriesValue = 0;
    let proteinsValue = 0;
    if(this.targetCalories.value) {
      caloriesValue = this.totals.calories*100 / this.targetCalories.value;
      if(caloriesValue>100) {
        caloriesValue = 100;
      }
    }
    if(this.targetProteins.value) {
      proteinsValue = this.totals.proteins*100 / this.targetProteins.value;
      if(proteinsValue>100) {
        proteinsValue = 100;
      }
    }
    const caloriesBkg = this.getTargetBkg(caloriesValue);
    const proteinsBkg = this.getTargetBkg(proteinsValue);
    return { 
      calories: { 
        value: caloriesValue, 
        bkg: caloriesBkg
      },
      proteins: {
        value: proteinsValue, 
        bkg: proteinsBkg
      }
    }
  }

  getTargetBkg(value: number): string {
    if(value === 0) { return this.redColor };
    if(value > 0 && value <= 50) { return this.redColor };
    if(value > 50 && value <= 80) { return this.yellowColor };
    return this.greenColor;
  }

  getCalculated(items: NutritionItem[]): CalculatedItem[] {
    return items.map(item => {
      const control = new FormControl(100);
      this.controls[item._id] = control;
      control.valueChanges.subscribe(value => {
        this.update(item, value)
      });
      return {
        item,
        control,
        calories: item.fact.calories,
        proteins: item.fact.protein,
      }
    });
  }

  update(item: NutritionItem, value: any) {
    const amount = parseFloat(value || 0);
    this.calculated = this.calculated.map(c => {
      if(c.item._id !==item._id) return c;
      const calories = c.control.value * c.item.fact.calories / 100;
      const proteins = c.control.value * c.item.fact.protein / 100;
      return {
        ...c,
        calories,
        proteins,
      }
    })
    this.totals = this.getTotals(this.calculated);
    this.targets = this.getTargets();
    console.log(this.targets)
  }

  getTotals(calculated: CalculatedItem[]): CalculateTotals {
    let calories = 0;
    let proteins = 0;

    calculated.forEach(c => {
      calories = calories + c.calories;
      proteins = proteins + c.proteins;
    });

    return { calories, proteins }
  }

  ngOnDestroy(): void {
    this.calculateSub.unsubscribe();
  }
}
