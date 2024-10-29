import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreInfoComponent } from './core-info.component';

describe('CoreInfoComponent', () => {
  let component: CoreInfoComponent;
  let fixture: ComponentFixture<CoreInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
