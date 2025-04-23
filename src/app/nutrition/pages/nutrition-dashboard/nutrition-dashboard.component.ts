import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NutritionCategory, NutritionItem } from '@/nutrition/types';
import { NutritionApiService } from '@/nutrition/services/nutrition-api.service';
import { CoreLoadingComponent } from '@/material/components/core-loading/core-loading.component';
import { DashboardFilterComponent } from '@/nutrition/components/dashboard-filter/dashboard-filter.component';
import { DashboardItemsComponent } from '@/nutrition/components/dashboard-items/dashboard-items.component';


@Component({
  selector: 'app-nutrition-dashboard',
  standalone: true,
  imports: [
    CoreLoadingComponent,
    DashboardFilterComponent,
    DashboardItemsComponent
  ],
  templateUrl: './nutrition-dashboard.component.html',
  styleUrl: './nutrition-dashboard.component.scss'
})
export class NutritionDashboardComponent implements OnInit {
  title = '';
  loading = false;
  categories: NutritionCategory[] | null = null;
  items: NutritionItem[] | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly nutritionApiService: NutritionApiService
  ) {
    this.title = this.route.snapshot.data['title'];
  }

  ngOnInit(): void {
    this.loading = true;
    forkJoin({
      categories: this.nutritionApiService.getCategories(),
      items: this.nutritionApiService.getItems(),
    })
    .subscribe((res: any) => {
      this.categories = res.categories;
      this.items = res.items;
      this.loading = false;
    })
  }

  onCategoryChange(category: string) {
    this.loading = true;
    this.nutritionApiService.getItems({ category }).subscribe(items => {
      this.loading = false;
      this.items = items;
    })
  }
}
