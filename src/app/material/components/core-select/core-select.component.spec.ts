import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreSelectComponent } from './core-select.component';

describe('CoreSelectComponent', () => {
  let component: CoreSelectComponent;
  let fixture: ComponentFixture<CoreSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
