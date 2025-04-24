import {
  Injectable,
  ComponentRef,
  ApplicationRef,
  EnvironmentInjector,
  Type,
  createComponent
} from '@angular/core'

import { 
  CoreModalComponent, 
  CoreModalBtn, 
} from '@/material/components/core-modal/core-modal.component';


interface Options {
  title: string;
  data: any;
  primaryBtn?: CoreModalBtn;
  secondaryBtn?: CoreModalBtn;
}

@Injectable({
  providedIn: 'root',
})
export class CoreModalService {
  newModalComponent!: ComponentRef<CoreModalComponent>;
  options!: Options;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open<C>(component: Type<C>, options: Options) {
    this.options = options;

    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });

    this.newModalComponent = createComponent(CoreModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });

    this.newModalComponent.instance.title = this.options.title;
    this.newModalComponent.instance.data = this.options.data;
    this.newModalComponent.instance.primaryBtn = this.options.primaryBtn || null;
    this.newModalComponent.instance.secondaryBtn = this.options.secondaryBtn || {
      label: 'Cancel',
      action: () => this.close()
    };

    document.body.appendChild(this.newModalComponent.location.nativeElement);

    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModalComponent.hostView);
  }

  close() {
    this.newModalComponent.instance.close();
  }

  getData() {
    return this.options.data;
  }
}
