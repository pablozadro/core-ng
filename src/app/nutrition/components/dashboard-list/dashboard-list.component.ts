import { Component, Inject, OnInit} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { CORE_CONFIG, CoreConfig } from '@/material/config';

import { 
  CoreLoadingComponent, 
  CoreMessageComponent,
  CoreTableComponent
} from '@/material/components';

import { NutritionItem } from '@/nutrition/types';

import { Store } from '@ngrx/store';
import { AppState } from '@/app.reducer';
import { 
  selectNutritionItems,
  NutritionItemsState,
  selectNutritionItemsFilter,
  NutritionItemsFilterState
} from '@/nutrition/state/nutrition.reducer';

import { addCalculate } from '@/nutrition/state/nutrition.actions';


@Component({
  selector: 'app-dashboard-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CoreLoadingComponent, 
    CoreMessageComponent,
    CoreTableComponent
  ],
  templateUrl: './dashboard-list.component.html',
  styleUrl: './dashboard-list.component.scss'
})
export class DashboardListComponent implements OnInit {
  items$!: Observable<NutritionItemsState>;
  items: NutritionItem[] = [];

  filter$!: Observable<NutritionItemsFilterState>;

  tableHeaders = ['title', 'calories','proteins'];
  tableData: NutritionItem[] = [];
  tableColumns = [
    { 
      field: 'title',
    }, 
    { 
      field: 'fact.calories',
      format: (value: number) => value || '-'
    }, 
    { 
      field: 'fact.protein',
      format: (value: number) => value || '-'
    },
  ];

  constructor(
    private readonly store: Store<AppState>,
    @Inject(CORE_CONFIG) readonly config: CoreConfig,
  ) {
    this.items$ = this.store.select(selectNutritionItems);
    this.filter$ = this.store.select(selectNutritionItemsFilter);
  }

  ngOnInit(): void {
    this.items$.subscribe(items => {
      this.items = [...items.payload];
      this.tableData = [...items.payload];
    });

    this.filter$.subscribe(({ title }) => {
      if(!title) {
        this.tableData = [...this.items];
      } else {
        this.tableData = this.items.filter(item => item.title.includes(title));
      }
    });
  }

  onRowClicked(item: NutritionItem) {
    this.store.dispatch(addCalculate({ item }));
  }
}
