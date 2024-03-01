import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ModalsService } from '@/material/services/modals.service';

@Component({
  selector: 'co-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() id = '';
  constructor (
    private readonly modalService: ModalsService
  ) {
  }

  onClose() {
    this.modalService.close(this.id);
  }
}
