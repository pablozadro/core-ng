import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialLoadingComponent } from './material-loading.component';

describe('MaterialLoadingComponent', () => {
  let component: MaterialLoadingComponent;
  let fixture: ComponentFixture<MaterialLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
