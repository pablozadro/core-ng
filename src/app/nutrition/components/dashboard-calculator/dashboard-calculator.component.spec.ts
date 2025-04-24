import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCalculatorComponent } from './dashboard-calculator.component';

describe('DashboardCalculatorComponent', () => {
  let component: DashboardCalculatorComponent;
  let fixture: ComponentFixture<DashboardCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
