import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NutritionApiService, NutritionCategory } from '@/nutrition/services/nutrition-api.service';
import { CoreLoadingComponent } from '@/material/components/core-loading/core-loading.component';
import { DashboardFilterComponent } from '@/nutrition/components/dashboard-filter/dashboard-filter.component';

@Component({
  selector: 'app-nutrition-dashboard',
  standalone: true,
  imports: [
    CoreLoadingComponent,
    DashboardFilterComponent
  ],
  templateUrl: './nutrition-dashboard.component.html',
  styleUrl: './nutrition-dashboard.component.scss'
})
export class NutritionDashboardComponent implements OnInit {
  title = '';
  loading = false;
  categories: NutritionCategory[] | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly nutritionApiService: NutritionApiService
  ) {
    this.title = this.route.snapshot.data['title'];
  }

  ngOnInit(): void {
    this.loading = true;
    this.nutritionApiService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    });
  }
}
