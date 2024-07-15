import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTopnavComponent } from './core-topnav.component';

describe('CoreTopnavComponent', () => {
  let component: CoreTopnavComponent;
  let fixture: ComponentFixture<CoreTopnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreTopnavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreTopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
