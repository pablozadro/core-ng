import { Component, OnInit, Input, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-material-message',
  templateUrl: './material-message.component.html',
  styleUrls: ['./material-message.component.scss']
})
export class MaterialMessageComponent implements OnInit {
  @Input() block = false;
  @Input() status: 'warning' | 'success' | 'error' = 'warning';
  @Input() text: string = 'warning';
  @Input() icon: string = 'error';

  constructor() { }

  ngOnInit(): void {
  }

  getClassName() {
    let c = `msg ${this.status}-theme`;

    if (this.block) {
      c = `${c} is--block`;
    }

    return c;
  }
}
