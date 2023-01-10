import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialButtonComponent } from '.';

describe('MaterialButtonComponent', () => {
  let component: MaterialButtonComponent;
  let fixture: ComponentFixture<MaterialButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
