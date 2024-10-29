import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreMessageComponent } from './core-message.component';

describe('CoreMessageComponent', () => {
  let component: CoreMessageComponent;
  let fixture: ComponentFixture<CoreMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
