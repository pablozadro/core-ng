import { CommonModule } from '@angular/common';
import { 
  ChangeDetectionStrategy, 
  Component, 
  Input, 
  NgModule, 
  ViewEncapsulation 
} from '@angular/core';

@Component({
    selector: 'app-material-button',
    templateUrl: './material-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./material-button.component.scss'],
    host: { class: 'app-material-element' }
})
export class MaterialButton {
  @Input() text: string = '';
  @Input() theme: 'primary' | 'secondary' | 'black' | 'white' | 'light-gray' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() icon?: string;
  @Input() square?: boolean
  @Input() block?: boolean

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

@NgModule({
    imports: [CommonModule],
    exports: [MaterialButton],
    declarations: [MaterialButton]
})
export class MaterialButtonModule {}
