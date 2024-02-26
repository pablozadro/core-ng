import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnfPageComponent } from './pnf-page.component';

describe('PnfPageComponent', () => {
  let component: PnfPageComponent;
  let fixture: ComponentFixture<PnfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PnfPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PnfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
