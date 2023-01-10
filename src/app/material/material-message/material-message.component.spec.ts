import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMessageComponent } from '.';

describe('MaterialMessageComponent', () => {
  let component: MaterialMessageComponent;
  let fixture: ComponentFixture<MaterialMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
