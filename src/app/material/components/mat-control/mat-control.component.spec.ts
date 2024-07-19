import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatControlComponent } from './mat-control.component';

describe('MatControlComponent', () => {
  let component: MatControlComponent;
  let fixture: ComponentFixture<MatControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
