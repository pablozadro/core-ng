import { Component, Input, OnInit } from '@angular/core';
import { NutritionItem } from '@/nutrition/types';

@Component({
  selector: 'app-dashboard-items',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-items.component.html',
  styleUrl: './dashboard-items.component.scss'
})
export class DashboardItemsComponent implements OnInit {
  @Input() items: NutritionItem[] | null = null;

  ngOnInit(): void {
    if(!this.items) return;
  }
}
