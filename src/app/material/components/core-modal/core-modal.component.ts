import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { CoreModalService } from '@/material/services/core-modal.service';
import { CoreBtnComponent } from '@/material/components/core-btn/core-btn.component';

export interface PrimaryBtn {
  label: string;
  action: any;
}

export interface SecondaryBtn {
  label: string;
  action: any;
}

@Component({
  selector: 'core-modal',
  standalone: true,
  imports: [
    CoreBtnComponent
  ],
  templateUrl: './core-modal.component.html',
  styleUrl: './core-modal.component.scss'
})
export class CoreModalComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
  @Input() title!: string;
  @Input() primaryBtn!: PrimaryBtn;
  @Input() secondaryBtn!: SecondaryBtn;
  @Input() data!: any;

  constructor(
    private readonly coreModalService: CoreModalService,
    private element: ElementRef
  ) {}

  ngOnInit(): void {
    console.log(this.element);
  }
  onClose() {
    this.coreModalService.close();
  }

  close() {
    this.element.nativeElement.remove();
    this.modal.nativeElement.remove();
  }
}
