import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { CORE_CONFIG, CoreConfig } from '@/material/config';
import { CoreModalService } from '@/material/services/core-modal.service';
import { 
  CoreBrandComponent,
  CoreBtnComponent,
  CoreControlComponent,
  CoreSelectComponent,
  CoreLoadingComponent,
  CoreMessageComponent,
  CoreTableComponent,
} from '@/material/components';


@Component({
  selector: 'app-material-demo-modal-inner-component',
  standalone: true,
  imports: [],
  template: `
    <div>Hello {{data.title}}!</div>
  `,
})
export class ModalInnerComponent {
  data: any;
  constructor(
    private readonly coreModalService: CoreModalService
  ) {
    this.data = this.coreModalService.getData();
  }
}


@Component({
  selector: 'app-material-demo',
  standalone: true,
  imports: [
    CoreBtnComponent,
    CoreBrandComponent,
    CoreControlComponent,
    CoreLoadingComponent,
    CoreMessageComponent,
    CoreTableComponent,
    CoreSelectComponent
  ],
  templateUrl: './material-demo.component.html',
  styleUrl: './material-demo.component.scss'
})
export class MaterialDemoComponent {
  title = '';
  sizes = this.config.sizes;
  mixins = this.config.mixins;
  brandMixins = this.config.brandMixins;

  selectOptions = [
    { value: '', label: 'Select a category' },
    { value: 1, label: 'Category A' },
    { value: 2, label: 'Category B' },
    { value: 4, label: 'Category C' },
  ];
  selectControlRequired = new FormControl(this.selectOptions[0].value, [Validators.required]);
  selectControlNotRequired = new FormControl(this.selectOptions[0].value);

  control1 = new FormControl('');
  control2 = new FormControl('');
  controlRequired = new FormControl('',[Validators.required])
  controlEmail = new FormControl('',[Validators.email])
  controlPassword = new FormControl('',[Validators.minLength(6), Validators.maxLength(8)])
  controlDisabled = new FormControl({ value:'admin@localhost.io', disabled: true })
  controlSize = new FormControl('');
  controlInvisible = new FormControl('');

  tableHeaders = ['id', 'email'];
  tableColumns = [
    { field: 'id' }, 
    { field: 'email' }
  ];
  tableData = [
    {id: 1, email: 'foo@localhost.io', username: 'foo' },
    {id: 2, email: 'bar@localhost.io', username: 'bar' },
    {id: 3, email: 'baz@localhost.io', username: 'baz' },
  ]

  constructor(
    private readonly route: ActivatedRoute,
    private readonly coreModalService: CoreModalService,
    @Inject(CORE_CONFIG) private config: CoreConfig,
  ) {
    this.title = this.route.snapshot.data['title'];
  }

  onRowClicked(data: any) {
    console.log('-> onRowClicked', data);
  }

  onOpenModal() {
    this.coreModalService.open(ModalInnerComponent, {
      title: 'Demo Modal',
      data: { title: 'Foo' },
      primaryBtn: {
        label: 'Save',
        action: () => {
          console.log('-> modal primary action')
        }
      },
      secondaryBtn: {
        label: 'Cancel',
        action: () => this.coreModalService.close()
      }
    });
  }
}
