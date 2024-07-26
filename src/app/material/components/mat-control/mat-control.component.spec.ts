import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatControlComponent } from './mat-control.component';


describe('MatControlComponent', () => {
  let component: MatControlComponent;
  let fixture: ComponentFixture<MatControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatControlComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatControlComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    component.id ='mockid';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
