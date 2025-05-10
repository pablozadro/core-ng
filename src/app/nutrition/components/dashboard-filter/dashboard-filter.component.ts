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
    });

    this.titleControl.valueChanges
      .pipe(debounce(() => interval(500)))
      .subscribe((title: string) => {
        const filter = { title };
        this.store.dispatch(setFilter({ filter }))
      });

    this.query$.subscribe(query => {
      this.queryState = query;
      if(query.category) {
        console.log(query.category);
        this.categoryControlOptions.forEach(o => console.log(o.value))
        this.categoryControl.setValue(query.category);
      }
      if(query.orderBy && query.orderDir) {
        this.orderControl.setValue(`${query.orderBy} ${query.orderDir}`);
      }
    });

    // this.orderControl.valueChanges.subscribe(value => {
    //   if(!value) return;
    //   this.store.dispatch(setQuery({ query: {
    //     orderBy: value?.split(' ')[0],
    //     orderDir: parseInt(value?.split(' ')[1])
    //   }}));
    //   this.store.dispatch(getItems());
    // });

    // this.categoryControl.valueChanges.subscribe(category => {
    //   if(!category) return;
    //   this.store.dispatch(setQuery({ query: { category }}));
    //   this.store.dispatch(getItems());
    // });




    // this.categoryControl.valueChanges.subscribe(category => {
    //   const query = { category };
    //   if(category !== this.queryState.category) {
    //     this.store.dispatch(setQuery({ query }));
    //   }
    // })
  }

  getCategoryControlOptions(categories: NutritionCategory[]): CoreSelectOption[] {
    return [
      this.categoryControlDefaultOption,
      ...categories.map(category => ({ label: category.title, value: category._id }))
    ]
  }
}
