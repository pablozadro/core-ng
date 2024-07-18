import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatBrandComponent } from './mat-brand.component';

describe('MatBrandComponent', () => {
  let component: MatBrandComponent;
  let fixture: ComponentFixture<MatBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
