import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreBtnComponent } from './core-btn.component';

describe('CoreBtnComponent', () => {
  let component: CoreBtnComponent;
  let fixture: ComponentFixture<CoreBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
