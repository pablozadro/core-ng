import { Component, Input } from '@angular/core';
import { NutritionCategory } from '@/nutrition/services/nutrition-api.service';

@Component({
  selector: 'app-dashboard-filter',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-filter.component.html',
  styleUrl: './dashboard-filter.component.scss'
})
export class DashboardFilterComponent {
  @Input() categories: NutritionCategory[] | null = null;
}
