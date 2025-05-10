import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounce, interval } from 'rxjs';

import { 
  CoreControlComponent,
  CoreSelectComponent,
  CoreSelectOption
} from '@root/app/material/components';

import { NutritionCategory } from '@/nutrition/types';

import { Store } from '@ngrx/store';
import { AppState } from '@/app.reducer';
import { 
  selectNutritionCategories, 
  NutritionCategoriesState 
} from '@/nutrition/state/nutrition.reducer';

import { setFilter } from '@/nutrition/state/nutrition.actions';


@Component({
  selector: 'app-dashboard-filter',
  standalone: true,
  imports: [
    CoreControlComponent,
    CoreSelectComponent 
  ],
  templateUrl: './dashboard-filter.component.html',
  styleUrl: './dashboard-filter.component.scss'
})
export class DashboardFilterComponent implements OnInit {
  categories$!: Observable<NutritionCategoriesState>;

  titleControl = new FormControl();

  categoryControlDefaultOption: CoreSelectOption = { label: 'Select a category', value: '' };
  categoryControlOptions: CoreSelectOption[] = [
    this.categoryControlDefaultOption
  ];
  categoryControl = new FormControl(this.categoryControlDefaultOption.value);

  orderControlDefaultOption = { label: 'Select order', value: '' };
  orderControlOptions: CoreSelectOption[] = [
    this.orderControlDefaultOption,
    { label: 'title - ASC', value: 'title 1' },
    { label: 'title - DESC', value: 'title -1' },
  ];
  orderControl = new FormControl(this.orderControlDefaultOption.value);

  constructor(
    private readonly store: Store<AppState>
  ) {
    this.categories$ = this.store.select(selectNutritionCategories);
  }

  ngOnInit(): void {
    this.categories$
      .subscribe(categories => {
        this.categoryControlOptions = this.getCategoryControlOptions(categories.payload);
      });

    this.titleControl.valueChanges
      .pipe(debounce(() => interval(500)))
      .subscribe((title: string) => {
        const filter = { title };
        this.store.dispatch(setFilter({ filter }))
      });
  }

  getCategoryControlOptions(categories: NutritionCategory[]): CoreSelectOption[] {
    return [
      this.categoryControlDefaultOption,
      ...categories.map(category => ({ label: category.title, value: category._id }))
    ]
  }
}
