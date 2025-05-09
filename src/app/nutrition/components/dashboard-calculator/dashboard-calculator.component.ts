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

interface CalculateTargets {
  calories: {
    value: number;
    bkg: string;
  }
  proteins: {
    value: number;
    bkg: string;
  }
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
  readonly badCSSClass = 'error-bkg';
  readonly goodCSSClass = 'warning-bkg';
  readonly excelentCSSClass = 'success-bkg';
  calculate$: Observable<CalculatateState>;
  calculateSub!: Subscription;
  
  calculated: CalculatedItem[] = [];
  totals: CalculateTotals = {
    calories: 0,
    proteins: 0,
  }

  controls: any = {};

  targetCalories = new FormControl(2000);
  targetProteins = new FormControl(89*1.5);

  targets: CalculateTargets = {
    calories: {
      value: 0,
      bkg: this.badCSSClass
    },
    proteins: {
      value: 0,
      bkg: this.badCSSClass
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
      this.targets = this.getTargets(this.totals);
    });
    this.targetCalories.valueChanges.subscribe(value => {
      this.targets = this.getTargets(this.totals);
    })
    this.targetProteins.valueChanges.subscribe(value => {
      this.targets = this.getTargets(this.totals);
    });
  }

  getTargets(totals: CalculateTotals) {
    let caloriesValue = 0;
    let proteinsValue = 0;
    if(this.targetCalories.value) {
      caloriesValue = totals.calories*100 / this.targetCalories.value;
      caloriesValue = caloriesValue > 100 ? 100:caloriesValue;
    }
    if(this.targetProteins.value) {
      proteinsValue = totals.proteins*100 / this.targetProteins.value;
      proteinsValue = proteinsValue > 100 ? 100:proteinsValue;
    }

    return { 
      calories: { 
        value: caloriesValue, 
        bkg: this.getTargetBkg(caloriesValue)
      },
      proteins: {
        value: proteinsValue, 
        bkg: this.getTargetBkg(proteinsValue)
      }
    }
  }

  getTargetBkg(value: number): string {
    console.log(value);
    if(value === 0) { 
      console.log(this.badCSSClass);
      return this.badCSSClass;
    };
    if(value > 0 && value <= 50) { 
      console.log(this.badCSSClass);
      return this.badCSSClass;
    };
    if(value > 50 && value <= 80) { 
      console.log(this.goodCSSClass);
      return this.goodCSSClass;
    };
    console.log(this.excelentCSSClass)
    return this.excelentCSSClass;
  }

  getCalculated(items: NutritionItem[]): CalculatedItem[] {
    return items.map(item => {
      const control = new FormControl(100);
      this.controls[item._id] = control;
      control.valueChanges.subscribe(value => {
        this.update(item._id)
      });
      return {
        item,
        control,
        calories: item.fact.calories,
        proteins: item.fact.protein,
      }
    });
  }

  update(itemId: string) {
    this.calculated = this.calculated.map(c => {
      if(c.item._id !==itemId) return c;
      const calories = c.control.value * c.item.fact.calories / 100;
      const proteins = c.control.value * c.item.fact.protein / 100;
      return {
        ...c,
        calories,
        proteins,
      }
    })
    this.totals = this.getTotals(this.calculated);
    this.targets = this.getTargets(this.totals);
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
