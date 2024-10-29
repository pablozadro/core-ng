import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  onRowClicked(row: any) {
    this.rowClicked.emit(row);
  }
}
