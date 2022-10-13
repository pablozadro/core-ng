import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-material-brand',
  templateUrl: './material-brand.component.html',
  styleUrls: ['./material-brand.component.scss']
})
export class MaterialBrandComponent implements OnInit {
  @Input() theme: 'primary' | 'black' | 'white' = 'primary';
  @Input() size: 'sm' | 'rg' | 'md' | 'lg' | 'xl' | 'xxl' = 'rg';

  constructor() { }

  ngOnInit(): void {
  }

}
