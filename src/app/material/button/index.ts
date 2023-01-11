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
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() label?: string;
  @Input() theme: 'primary' | 'secondary' | 'black' | 'white' | 'light-gray' = 'primary';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() square = false;
  @Input() block = false;
}

@NgModule({
    imports: [CommonModule],
    exports: [MaterialButton],
    declarations: [MaterialButton]
})
export class MaterialButtonModule {}
