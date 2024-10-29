import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModalComponent } from './core-modal.component';

describe('CoreModalComponent', () => {
  let component: CoreModalComponent;
  let fixture: ComponentFixture<CoreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
