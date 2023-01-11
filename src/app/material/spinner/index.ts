import { CommonModule } from '@angular/common';
import { 
  ChangeDetectionStrategy, 
  Component, 
  Input, 
  NgModule, 
  ViewEncapsulation 
} from '@angular/core';

@Component({
    selector: 'app-material-spinner',
    templateUrl: './material-spinner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./material-spinner.component.scss'],
    host: { class: 'app-material-element' }
})
export class MaterialSpinner {
}

@NgModule({
    imports: [CommonModule],
    exports: [MaterialSpinner],
    declarations: [MaterialSpinner]
})
export class MaterialSpinnerModule {}
