import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { filter } from 'rxjs';
import { provideRouter, Router, NavigationEnd } from '@angular/router';


const links: { path: string; title?: string; }[]=  [
  { path: 'mock1', title: 'Mock title' },
  { path: 'mock2' },
];

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent
      ],
      providers: [
        provideRouter([
          { 
            path: links[0].path, 
            component: AppComponent, 
            data: { title: links[0].title } 
          },
          { 
            path: links[1].path, 
            component: AppComponent, 
            data: { } 
          },
        ])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  describe('Topnav', () => {

    it('should render app-core-topnav', () => {
      const topnav = fixture.nativeElement.querySelector('app-core-topnav');
      expect(topnav).toBeTruthy();
    });
  });


  describe('Page Title', () => {

    it('should set page title from router data', done => {
      router.events.pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          fixture.detectChanges();
          const h1 = fixture.nativeElement.querySelector('[data-id=app-page-title]');
          const title = h1?.textContent;
          expect(title).toEqual(links[0].title);
          done();
        })
      router.navigate([links[0].path])
    });

    it('should set default page title if no router data', done => {
      router.events.pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          fixture.detectChanges();
          const h1 = fixture.nativeElement.querySelector('[data-id=app-page-title]');
          const title = h1?.textContent;
          expect(title).toEqual(component.DEFAULT_PAGE_TITLE);
          done();
        })
      router.navigate([links[1].path])
    });
  });

});
