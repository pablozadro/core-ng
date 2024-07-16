import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CoreTopnavComponent } from '@/core/components/core-topnav/core-topnav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    CoreTopnavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  DEFAULT_PAGE_TITLE = 'Unknown Page';
  pageTitle!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.route.firstChild || this.route;
        route.data.subscribe(data => {
          this.pageTitle = data['title'] || this.DEFAULT_PAGE_TITLE;
        })
      })
  }
}
