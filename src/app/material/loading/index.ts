import { CommonModule } from '@angular/common';
import { 
  ChangeDetectionStrategy, 
  Component, 
  Input, 
  NgModule, 
  ViewEncapsulation 
} from '@angular/core';

@Component({
    selector: 'app-material-loading',
    templateUrl: './material-loading.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./material-loading.component.scss'],
    host: { class: 'app-material-element' }
})
export class MaterialLoading {
  @Input() text = '';
}

@NgModule({
    imports: [CommonModule],
    exports: [MaterialLoading],
    declarations: [MaterialLoading]
})
export class MaterialLoadingModule {}
