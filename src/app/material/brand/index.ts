import { CommonModule } from '@angular/common';
import { 
  ChangeDetectionStrategy, 
  Component, 
  Input, 
  NgModule, 
  ViewEncapsulation 
} from '@angular/core';

@Component({
    selector: 'app-material-brand',
    templateUrl: './material-brand.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./material-brand.component.scss'],
    host: { class: 'app-material-element' }
})
export class MaterialBrand {
  @Input() theme: 'primary' | 'black' | 'white' = 'primary';
  @Input() size: 'sm' | 'rg' | 'md' | 'lg' | 'xl' | 'xxl' = 'rg';
}

@NgModule({
    imports: [CommonModule],
    exports: [MaterialBrand],
    declarations: [MaterialBrand]
})
export class MaterialBrandModule {}
