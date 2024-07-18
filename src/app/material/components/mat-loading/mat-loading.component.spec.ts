import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLoadingComponent } from './mat-loading.component';

describe('MatLoadingComponent', () => {
  let component: MatLoadingComponent;
  let fixture: ComponentFixture<MatLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
