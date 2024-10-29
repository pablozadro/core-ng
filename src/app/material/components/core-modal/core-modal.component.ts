import { Component, ViewChild, ElementRef } from '@angular/core';
import { CoreModalService } from '@/material/services/core-modal.service';
import { CoreBtnComponent } from '@/material/components/core-btn/core-btn.component';


@Component({
  selector: 'core-modal',
  standalone: true,
  imports: [
    CoreBtnComponent
  ],
  templateUrl: './core-modal.component.html',
  styleUrl: './core-modal.component.scss'
})
export class CoreModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;

  constructor(
    private readonly coreModalService: CoreModalService,
    private element: ElementRef
  ) {}

  onClose(e: Event) {
    this.coreModalService.close();
  }

  close() {
    this.element.nativeElement.remove();
    this.modal.nativeElement.remove();
  }
}
