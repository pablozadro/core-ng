import {
  Injectable,
  ViewContainerRef,
  ComponentRef,
  ApplicationRef,
  EnvironmentInjector,
  TemplateRef,
  Type,
  createComponent
} from '@angular/core'

import { CoreModalComponent } from '@/material/components/core-modal/core-modal.component';


interface Options {}

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

  // To get clean function call signatures, I will use typescript function overloading
  // Signature of the first approach  
  open(
    vcrOrComponent: ViewContainerRef,
    content: TemplateRef<Element>,
  ): void;

  // Signature of the second approach
  open<C>(vcrOrComponent: Type<C>): void;

  // Function implementation
  open<C>(
    vcrOrComponent: ViewContainerRef | Type<C>,
    param2?: TemplateRef<Element> | Options,
    options?: Options
  ) {
    if (vcrOrComponent instanceof ViewContainerRef) {
      // For the first approach, we know that the second param will be of type TemplateRef, so we have to cast it  
      this.openWithTemplate(vcrOrComponent, param2 as TemplateRef<Element>);
      this.options = options || {};
    } else {
      this.openWithComponent(vcrOrComponent);
      // Same story here : for the second approach, the second param will be of type Options or undefined, since optional 
      this.options = param2 as Options | {};
    }
  }

  private openWithTemplate(vcr: ViewContainerRef, content: TemplateRef<Element>) {
    // We first start to clear previous views
    vcr.clear();
    // We create a view with the template content 
    const innerContent = vcr.createEmbeddedView(content);

    // We create the modal component, and project the template content in the ng-content of the modal component 
    this.newModalComponent = vcr.createComponent(CoreModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [innerContent.rootNodes],
    });
  }

  private openWithComponent(component: Type<unknown>) {
    // create the desired component, the content of the modal box
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });
    // create the modal component and project the instance of the desired component in the ng-content
    this.newModalComponent = createComponent(CoreModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });

    document.body.appendChild(this.newModalComponent.location.nativeElement);

    // Attach views to the changeDetection cycle
    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModalComponent.hostView);
  }

  close() {
    this.newModalComponent.instance.close();
  }
}
