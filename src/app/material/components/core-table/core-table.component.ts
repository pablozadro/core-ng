import { Component, Input, Output, EventEmitter } from '@angular/core';
import { 
  CoreSize,
  CORE_SIZE_RG
} from '../../types';

interface CoreTableColumn {
  field: string;
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
  @Input() data: any;
  @Input() columns!: CoreTableColumn[];
  @Input() block = false;
  @Input() size:CoreSize = CORE_SIZE_RG;

  onRowClicked(row: any) {
    this.rowClicked.emit(row);
  }
}
