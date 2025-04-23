import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemModalComponent } from './dashboard-item-modal.component';

describe('DashboardItemModalComponent', () => {
  let component: DashboardItemModalComponent;
  let fixture: ComponentFixture<DashboardItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardItemModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
