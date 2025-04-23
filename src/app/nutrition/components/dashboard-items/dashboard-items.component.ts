import { Component, Input, OnInit } from '@angular/core';
import { CoreModalService } from '@/material/services/core-modal.service';
import { CoreTableComponent } from '@/material/components/core-table/core-table.component';
import { NutritionItem } from '@/nutrition/types';
import { DashboardItemModalComponent } from '@/nutrition/components/dashboard-item-modal/dashboard-item-modal.component';


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

  constructor(
    private readonly coreModalService: CoreModalService
  ) {}

  ngOnInit(): void {
    if(!this.items) return;
  }

  onRowClicked(item: NutritionItem) {
    this.coreModalService.open(DashboardItemModalComponent, {
      title: `${item.title}`,
      data: { item },
      primaryBtn: {
        label: 'Save',
        action: () => this.onItemModalSaveAction()
      },
      secondaryBtn: {
        label: 'Cancel',
        action: () => this.coreModalService.close()
      }
    });
  }

  onItemModalSaveAction() {
    console.log('-> onItemModalSaveAction')
  }
}
