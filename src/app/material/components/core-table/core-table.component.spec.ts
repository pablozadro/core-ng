import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTableComponent } from './core-table.component';

describe('CoreTableComponent', () => {
  let component: CoreTableComponent;
  let fixture: ComponentFixture<CoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
