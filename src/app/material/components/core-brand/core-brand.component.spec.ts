import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreBrandComponent } from './core-brand.component';

describe('CoreBrandComponent', () => {
  let component: CoreBrandComponent;
  let fixture: ComponentFixture<CoreBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
