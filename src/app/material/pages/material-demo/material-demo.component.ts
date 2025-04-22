import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CORE_CONFIG, CoreConfig } from '@/material/config';
import { CoreModalService } from '@/material/services/core-modal.service';
import { CoreBtnComponent } from '@/material/components/core-btn/core-btn.component';
import { CoreBrandComponent } from '@/material/components/core-brand/core-brand.component';
import { CoreControlComponent } from '@/material/components/core-control/core-control.component';
import { CoreLoadingComponent } from '@/material/components/core-loading/core-loading.component';
import { CoreMessageComponent } from '@/material/components/core-message/core-message.component';
import { CoreTableComponent } from '@/material/components/core-table/core-table.component';


@Component({
  selector: 'app-material-demo-modal-inner-component',
  standalone: true,
  imports: [],
  template: `
    <div>Hello</div>
  `,
})
export class ModalInnerComponent {}


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
  ],
  templateUrl: './material-demo.component.html',
  styleUrl: './material-demo.component.scss'
})
export class MaterialDemoComponent {
  title = '';
  sizes = Object.entries(this.config.size).map(entry => entry[1]);
  mixins = Object.entries(this.config.mixins).map(entry => entry[1]);
  brandMixins = Object.entries(this.config.brandMixins).map(entry => entry[1]);
  control1 = new FormControl();
  control2 = new FormControl('abc123');
  control3 = new FormControl('admin@localhost.io');
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

  onModalPrimaryAction() {
    console.log('-> modal primary action')
  }

  onOpenModal() {
    console.log('-> opening modal...');
    this.coreModalService.open(ModalInnerComponent, {
      title: 'Demo Modal',
      primaryBtn: {
        label: 'Save',
        action: () => this.onModalPrimaryAction()
      },
      secondaryBtn: {
        label: 'Cancel',
        action: () => this.coreModalService.close()
      }
    });
  }
}
