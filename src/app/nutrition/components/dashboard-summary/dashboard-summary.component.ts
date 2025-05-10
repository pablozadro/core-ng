import { AsyncPipe, DecimalPipe, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { CoreBtnComponent, CoreControlComponent } from '@root/app/material/components';

import { AppState } from '@/app.reducer';
import { Store } from '@ngrx/store';

import {
  NutritionCalculateItem,
  NutritionCalculatePayload,
  NutritionCalculateState,
  selectNutritionCalculate
} from '@/nutrition/state/nutrition.reducer';

import { removeCalculate, updateCalculate } from '@/nutrition/state/nutrition.actions';



@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe,
    NgStyle,
    CoreBtnComponent, 
    CoreControlComponent
],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.scss'
})
export class DashboardSummaryComponent implements OnInit {
  calculate$!: Observable<NutritionCalculateState>;
  calculatePayload!: NutritionCalculatePayload;

  totalProteins = 0;
  totalCalories = 0;

  controls: any = {};

  targetProteins = new FormControl(90*1.5)
  targetCalories = new FormControl(2000)

  constructor(
    private readonly store: Store<AppState>,
  ) {
    this.calculate$ = this.store.select(selectNutritionCalculate);
  }

  ngOnInit(): void {
    this.calculate$.subscribe(calculate => {
      this.calculatePayload = { ...calculate.payload };
      this.createControls(calculate.payload);
      this.calculateTotals(calculate.payload);
    });
  }

  createControls(payload: NutritionCalculatePayload) {
    this.controls = {};
    for (const id in payload) {
      const amount = payload[id].calculate.amount;
      const control = new FormControl(amount);
      this.controls[id] = control;
      control.valueChanges.subscribe(value => {
        this.update(id, value);
      });
    }
  }

  calculateTotals(payload: NutritionCalculatePayload) {
    this.totalCalories = 0;
    this.totalProteins = 0;
    for (const id in payload) {
      this.totalCalories = this.totalCalories + payload[id].calculate.calories;
      this.totalProteins = this.totalProteins + payload[id].calculate.protein;
    }
  }

  update(id: string, value: any) {
    const amount = parseFloat(value);
    const calcItem = this.calculatePayload[id];
    const calories = (amount * calcItem.item.calories) / 100;
    const protein = (amount * calcItem.item.proteins) / 100;
    const calculateItem: NutritionCalculateItem = {
      ...calcItem,
      calculate: {
        amount,
        calories,
        protein
      }
    }
    this.store.dispatch(updateCalculate({ calculateItem }))
  }

  getTargetBkgClass(perc: number): string {
    if(perc > 0 && perc <= 15) {
      return 'target-bkg-very-low';
    }
    if(perc > 15 && perc <= 30) {
      return 'target-bkg-low';
    }
    if(perc > 30 && perc <= 45) {
      return 'target-bkg-middle';
    }
    if(perc > 45 && perc <= 60) {
      return 'target-bkg-good';
    }
    if(perc > 60 && perc <= 80) {
      return 'target-bkg-very-good';
    }
    if(perc > 80 && perc <= 100) {
      return 'target-bkg-excelent';
    }
    if(perc > 100) {
      return 'target-bkg-over';
    }
    return 'target-bkg-over';
  }

  getTargetCaloriesPerc(): number {
    if(!this.targetCalories.value) return 0;
    return (this.totalCalories * 100) / this.targetCalories.value;
  }

  getTargetProteinsPerc() {
    if(!this.targetProteins.value) return 0;
    return (this.totalProteins * 100) / this.targetProteins.value;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  onRemove(id: string) {
    this.store.dispatch(removeCalculate({ id }))
  }
}
