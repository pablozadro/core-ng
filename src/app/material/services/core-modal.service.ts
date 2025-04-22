import {
  Injectable,
  ComponentRef,
  ApplicationRef,
  EnvironmentInjector,
  Type,
  createComponent
} from '@angular/core'

import { CoreModalComponent } from '@/material/components/core-modal/core-modal.component';


interface Options {
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class CoreModalService {
  // Create a reference to our modal component
  newModalComponent!: ComponentRef<CoreModalComponent>;
  options!: Options;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open<C>(component: Type<C>, options: Options) {
    this.options = options;
    this.openWithComponent(component);
  }

  private openWithComponent(component: Type<unknown>) {
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });

    this.newModalComponent = createComponent(CoreModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });

    this.newModalComponent.instance.title = this.options.title;

    document.body.appendChild(this.newModalComponent.location.nativeElement);

    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModalComponent.hostView);
  }

  close() {
    this.newModalComponent.instance.close();
  }
}
