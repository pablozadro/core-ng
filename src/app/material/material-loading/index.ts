import { Component, OnInit, Input, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-material-loading',
  templateUrl: './material-loading.component.html',
  styleUrls: ['./material-loading.component.scss']
})
export class MaterialLoadingComponent implements OnInit {
  @Input() text = '';
  constructor() { }

  ngOnInit(): void {
  }

}
