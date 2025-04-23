import { Component, Input, OnInit } from '@angular/core';
import { NutritionItem } from '@/nutrition/types';
import { CoreTableComponent } from '@/material/components/core-table/core-table.component';

@Component({
  selector: 'app-dashboard-items',
  standalone: true,
  imports: [
    CoreTableComponent
  ],
  templateUrl: './dashboard-items.component.html',
  styleUrl: './dashboard-items.component.scss'
})
export class DashboardItemsComponent implements OnInit {
  @Input() items: NutritionItem[] | null = null;
  tableHeaders = ['title'];
  tableColumns = [
    { field: 'title' }, 
  ];
  tableData = this.items;

  ngOnInit(): void {
    if(!this.items) return;
  }

  onRowClicked(item: NutritionItem) {
    console.log(item);
  }
}
