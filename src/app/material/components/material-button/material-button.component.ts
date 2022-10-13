import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-material-button',
  templateUrl: './material-button.component.html',
  styleUrls: ['./material-button.component.scss']
})
export class MaterialButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() theme: 'primary' | 'secondary' | 'black' | 'white' | 'light-gray' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() icon?: string;
  @Input() square?: boolean
  @Input() block?: boolean

  constructor() { }

  ngOnInit(): void {
  }

  getClassName() {
    let c = `${this.theme}-btn`;
    if (this.square) {
      c = `${c} is--square`;
    }
    if (this.block) {
      c = `${c} is--block`;
    }
    return c;
  }
}
