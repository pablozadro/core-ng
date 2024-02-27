import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMessageComponent } from './mat-message.component';

describe('MatMessageComponent', () => {
  let component: MatMessageComponent;
  let fixture: ComponentFixture<MatMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
