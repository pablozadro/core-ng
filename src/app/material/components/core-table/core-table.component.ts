import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MatSize } from '@/material/types';
import { MAT_SIZE_RG } from '@/material/config';


interface CoreTableColumn {
  field: string;
  format?: any;
}

@Component({
  selector: 'core-table',
  standalone: true,
  imports: [],
  templateUrl: './core-table.component.html',
  styleUrl: './core-table.component.scss'
})
export class CoreTableComponent {
  @Output() rowClicked = new EventEmitter<any>();

  @Input() headers!: string[];
  @Input() data!: any[];
  @Input() columns!: CoreTableColumn[];
  @Input() block = false;
  @Input() size:MatSize = MAT_SIZE_RG;

  onRowClicked(row: any) {
    this.rowClicked.emit(row);
  }
}
