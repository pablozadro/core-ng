import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, debounce, interval } from 'rxjs';

import { 
  CORE_PENDING_STATUS, 
  CORE_INPROGRESS_STATUS, 
  CORE_DONE_STATUS 
} from '@/core/config';

import { 
  CoreLoadingComponent,
  CoreSelectComponent,
  CoreSelectOption,
  CoreControlComponent
} from '@/material/components';

import { AppState } from '@/app.reducer';

import { 
  NutritionState,
  selectNutrition 
} from '@/nutrition/state/nutrition.reducer';

import { NutritionCategory, GetItemsQuery } from '@/nutrition/types';
import {
  setQuery
} from '@/nutrition/state/nutrition.actions';


@Component({
  selector: 'dashboard-filters',
  standalone: true,
  imports: [
    AsyncPipe,
    CoreLoadingComponent,
    CoreSelectComponent,
    CoreControlComponent
  ],
  templateUrl: './dashboard-filters.component.html',
  styleUrl: './dashboard-filters.component.scss'
})
export class DashboardFiltersComponent implements OnInit, OnDestroy {
  readonly CORE_PENDING_STATUS = CORE_PENDING_STATUS;
  readonly CORE_INPROGRESS_STATUS = CORE_INPROGRESS_STATUS;
  readonly CORE_DONE_STATUS = CORE_DONE_STATUS;
  readonly defaultCategoryOption: CoreSelectOption = { 
    label: 'Select Category',
    value: '',
  };
  readonly defaultOrderByOption: CoreSelectOption = { 
    label: 'Order By', value: '',
  };
  readonly orderByOptions: CoreSelectOption[] = [
    this.defaultOrderByOption,
    { label: 'Proteins - ASC', value: 'PROTEIN-ASC' },
    { label: 'Proteins - DESC', value: 'PROTEIN-DESC'},
    { label: 'Calories - ASC', value: 'CALORIES-ASC'},
    { label: 'Calories - DESC', value: 'CALORIES-DESC'},
    { label: 'Title - ASC', value: 'TITLE-ASC'},
    { label: 'Title - DESC', value: 'TITLE-DESC'},
  ];

  nutrition$!: Observable<NutritionState>;
  nutritionSub!: Subscription;

  stateQuery!: GetItemsQuery;

  categoriesOptions: CoreSelectOption[] = [ this.defaultCategoryOption ];
  categoryControl = new FormControl(this.defaultCategoryOption.value);
  categoryControlSub!: Subscription;

  titleControl = new FormControl('');
  titleControlSub!: Subscription;

  orderByControl = new FormControl(this.defaultOrderByOption.value);
  orderByControlSub!: Subscription;

  constructor(
    private readonly store: Store<AppState>
  ) {
    this.nutrition$ = this.store.select(selectNutrition);
  }

  ngOnInit(): void {
    this.nutritionSub = this.nutrition$.subscribe(state => {
      this.categoriesOptions = this.getOptions(state.categories.payload);
      this.stateQuery = state.query;
      if(state.query.category) {
        this.categoryControl.setValue(state.query.category);
      }
      if(state.query.orderBy) {
        this.orderByControl.setValue(state.query.orderBy);
      }
    });

    this.categoryControlSub = this.categoryControl.valueChanges.subscribe(category => {
      const query = { ...this.stateQuery, category };
      if(category !== this.stateQuery.category) {
        this.store.dispatch(setQuery({ query }));
      }
    });

    this.orderByControlSub = this.orderByControl.valueChanges.subscribe(orderBy => {
      const query = { ...this.stateQuery, orderBy };
      if(orderBy !== this.stateQuery.orderBy) {
        this.store.dispatch(setQuery({ query }));
      }
    });

    this.titleControlSub = this.titleControl.valueChanges
      .pipe(debounce(() => interval(500)))
      .subscribe(title => {
        console.log('-> Title: ', title)
      });
  }

  private getOptions(categories: NutritionCategory[]): CoreSelectOption[] {
    return [
      this.defaultCategoryOption,
      ...categories.map(category => ({ 
        label: category.title, 
        value: category._id 
      }))
    ]
  }

  ngOnDestroy(): void {
    this.nutritionSub.unsubscribe();
    this.categoryControlSub.unsubscribe();
    this.titleControlSub.unsubscribe();
  }
}
