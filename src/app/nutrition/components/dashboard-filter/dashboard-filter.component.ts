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
  NutritionCategoriesState,
  selectNutritionItemsQuery,
  NutritionItemsQueryState
} from '@/nutrition/state/nutrition.reducer';

import { getItems, setFilter, setQuery } from '@/nutrition/state/nutrition.actions';


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
  query$!: Observable<NutritionItemsQueryState>;
  queryState!: NutritionItemsQueryState;

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
    { label: 'protein - ASC', value: 'fact.protein 1' },
    { label: 'protein - DESC', value: 'fact.protein -1' },
    { label: 'calories - ASC', value: 'fact.calories 1' },
    { label: 'calories - DESC', value: 'fact.calories -1' },
  ];
  orderControl = new FormControl(this.orderControlDefaultOption.value);

  constructor(
    private readonly store: Store<AppState>
  ) {
    this.categories$ = this.store.select(selectNutritionCategories);
    this.query$ = this.store.select(selectNutritionItemsQuery);
  }

  ngOnInit(): void {
    this.categories$.subscribe(categories => {
      this.categoryControlOptions = this.getCategoryControlOptions(categories.payload);
      if(this.queryState && this.queryState.category) {
        if(this.queryState.category === this.categoryControl.value) return;
        this.categoryControl.setValue(this.queryState.category);
      }
    });

    this.query$.subscribe(query => {
      this.queryState = query;
      if(this.queryState.orderBy && !this.queryState.orderDir) {
        const current = this.orderControl.value;
        if(!current) {
          this.orderControl.setValue(`${this.queryState.orderBy} 1`)
        } else {
          this.orderControl.setValue(`${this.queryState.orderBy} ${current[1]}`)
        }
      }
      if(!this.queryState.orderBy && this.queryState.orderDir) {
        const current = this.orderControl.value;
        if(!current) {
          this.orderControl.setValue(`fact.protein ${this.queryState.orderDir}`)
        } else {
          this.orderControl.setValue(`${current[0]} ${this.queryState.orderDir}`)
        }
      }
      if(this.queryState.orderBy && this.queryState.orderDir) {
        this.orderControl.setValue(`${this.queryState.orderBy} ${this.queryState.orderDir}`)
      }
    });

    this.categoryControl.valueChanges.subscribe(category => {
      if(category === this.queryState.category) return;
      this.store.dispatch(setQuery({ query: { 
        ...this.queryState,
        category 
      }}))
      this.store.dispatch(getItems());
    });

    this.orderControl.valueChanges.subscribe(order => {
      if(!order) return;
      const split = order.split(' ');
      const orderBy = split[0];
      const orderDir = parseInt(split[1]);
      if(order === `${this.queryState.orderBy} ${this.queryState.orderDir}`) return;
      this.store.dispatch(setQuery({ query: {
        ...this.queryState,
        orderBy, orderDir 
      }}))
      this.store.dispatch(getItems());
    })


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
