import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';

import { CoreTopnavComponent } from './core-topnav.component';




describe('CoreTopnavComponent', () => {
  let component: CoreTopnavComponent;
  let fixture: ComponentFixture<CoreTopnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ 
        CoreTopnavComponent,
      ]
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
