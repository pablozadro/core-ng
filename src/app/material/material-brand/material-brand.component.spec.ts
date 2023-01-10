import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialBrandComponent } from '.';

describe('MaterialBrandComponent', () => {
  let component: MaterialBrandComponent;
  let fixture: ComponentFixture<MaterialBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
