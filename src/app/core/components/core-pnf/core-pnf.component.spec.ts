import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePnfComponent } from './core-pnf.component';

describe('CorePnfComponent', () => {
  let component: CorePnfComponent;
  let fixture: ComponentFixture<CorePnfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorePnfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePnfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
