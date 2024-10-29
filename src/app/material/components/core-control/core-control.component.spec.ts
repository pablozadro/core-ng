import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { CoreControlComponent } from './core-control.component';

describe('CoreControlComponent', () => {
  let component: CoreControlComponent;
  let fixture: ComponentFixture<CoreControlComponent>;
  const mockControl = new FormControl('');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreControlComponent);
    component = fixture.componentInstance;
    component.id = 'mockControl';
    component.control = mockControl;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
