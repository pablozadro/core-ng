import { CommonModule } from '@angular/common';
import { 
  ChangeDetectionStrategy, 
  Component, 
  Input, 
  NgModule, 
  ViewEncapsulation 
} from '@angular/core';

@Component({
    selector: 'app-material-message',
    templateUrl: './material-message.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./material-message.component.scss'],
    host: { class: 'app-material-element' }
})
export class MaterialMessage {
  @Input() block = false;
  @Input() status: 'warning' | 'success' | 'error' = 'warning';
  @Input() text: string = 'warning';
  @Input() icon: string = 'error';

  getClassName() {
    let c = `msg ${this.status}-theme`;

    if (this.block) {
      c = `${c} is--block`;
    }

    return c;
  }
}

@NgModule({
    imports: [CommonModule],
    exports: [MaterialMessage],
    declarations: [MaterialMessage]
})
export class MaterialMessageModule {}
