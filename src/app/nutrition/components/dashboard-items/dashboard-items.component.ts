import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  CORE_PENDING_STATUS, 
  CORE_INPROGRESS_STATUS, 
  CORE_DONE_STATUS 
} from '@/core/config';

import { 
  CoreLoadingComponent,
  CoreTableComponent,
  CoreMessageComponent
} from '@/material/components';

import { AppState } from '@/app.reducer';
import { ItemsState, selectNutritionItems } from '@/nutrition/state/nutrition.reducer';
import { NutritionItem } from '@/nutrition/types';
import { addToCalculate } from '@/nutrition/state/nutrition.actions';

@Component({
  selector: 'dashboard-items',
  standalone: true,
  imports: [
    AsyncPipe,
    CoreLoadingComponent,
    CoreTableComponent,
    CoreMessageComponent
  ],
  templateUrl: './dashboard-items.component.html',
  styleUrl: './dashboard-items.component.scss'
})
export class DashboardItemsComponent implements OnInit, OnDestroy {
  readonly CORE_PENDING_STATUS = CORE_PENDING_STATUS;
  readonly CORE_INPROGRESS_STATUS = CORE_INPROGRESS_STATUS;
  readonly CORE_DONE_STATUS = CORE_DONE_STATUS;

  items$!: Observable<ItemsState>;
  itemsSub!: Subscription;

  tableHeaders = ['title', 'calories','proteins'];
  tableData: NutritionItem[] = [];
  tableColumns = [
    { field: 'title' }, 
    { field: 'fact.calories' }, 
    { field: 'fact.protein' },
  ];

  constructor (
    private readonly store: Store<AppState>
  ) {
    this.items$ = this.store.select(selectNutritionItems);
  }

  ngOnInit(): void {
    this.itemsSub = this.items$.subscribe(items => {
      this.tableData = items.payload;
    })
  }

  onRowClicked(data: NutritionItem) {
    this.store.dispatch(addToCalculate({ item: data }));
  }

  ngOnDestroy(): void {
    this.itemsSub.unsubscribe();
  }
}
