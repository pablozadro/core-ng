import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-core-topnav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './core-topnav.component.html',
  styleUrl: './core-topnav.component.scss'
})
export class CoreTopnavComponent {
  token!: string | null;

  constructor(
    private readonly store: Store<any>
  ) {
    this.store.subscribe((state: any) => {
      this.token = state.auth.token;
    });
  }
}
