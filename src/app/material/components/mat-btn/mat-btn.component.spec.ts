import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatBtnComponent } from './mat-btn.component';

describe('MatBtnComponent', () => {
  let component: MatBtnComponent;
  let fixture: ComponentFixture<MatBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
