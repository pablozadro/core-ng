import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '@/app.reducer';

import { setQuery, getItems, getCategories } from '@/nutrition/state/nutrition.actions';
import { ParseItemsQueryService } from '@/nutrition/services/parse-items-query.service';

import { DashboardListComponent } from '@/nutrition/components/dashboard-list/dashboard-list.component';
import { DashboardFilterComponent } from '@/nutrition/components/dashboard-filter/dashboard-filter.component';
import { DashboardSummaryComponent } from '@/nutrition/components/dashboard-summary/dashboard-summary.component';



@Component({
  selector: 'app-nutrition-dashboard',
  standalone: true,
  imports: [
    DashboardListComponent,
    DashboardFilterComponent,
    DashboardSummaryComponent
  ],
  templateUrl: './nutrition-dashboard.component.html',
  styleUrl: './nutrition-dashboard.component.scss'
})
export class NutritionDashboardComponent implements OnInit {
  title = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>,
    private readonly parseItemsQueryService: ParseItemsQueryService,
  ) {
    this.title = this.route.snapshot.data['title'];
    this.store.dispatch(getCategories())
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = this.parseItemsQueryService.parse(params);
      if(query) {
        this.store.dispatch(setQuery({ query }));
      }
    });
  }
}
