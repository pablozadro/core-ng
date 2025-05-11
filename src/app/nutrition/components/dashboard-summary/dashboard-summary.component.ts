import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

import { CoreBtnComponent, CoreControlComponent } from '@root/app/material/components';

import { Store } from '@ngrx/store';
import { AppState } from '@/app.reducer';

import { 
  selectNutritionItems, 
  NutritionItemsState,
  selectNutritionCalculate,
  NutritionCalculateState,
} from '@/nutrition/state/nutrition.reducer';

import { removeCalculate } from '@/nutrition/state/nutrition.actions';


@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [
    AsyncPipe,
    CoreBtnComponent, 
    CoreControlComponent
],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.scss'
})
export class DashboardSummaryComponent implements OnInit {
  items$!: Observable<NutritionItemsState>;
  calculate$!: Observable<NutritionCalculateState>;

  totalProteins = 0;
  totalCalories = 0;

  constructor(
    private readonly store: Store<AppState>,
  ) {
    this.items$ = this.store.select(selectNutritionItems);
    this.calculate$ = this.store.select(selectNutritionCalculate);
  }

  ngOnInit(): void {
    this.calculate$.subscribe(calculate => {
      this.totalProteins = 0;
      this.totalCalories = 0;
      calculate.payload.forEach(item => {
        this.totalProteins = this.totalProteins + item.fact.protein;
        this.totalCalories = this.totalCalories + item.fact.calories;
      })
    });
  }

  onRemove(id: string) {
    this.store.dispatch(removeCalculate({ id }))
  }
}
