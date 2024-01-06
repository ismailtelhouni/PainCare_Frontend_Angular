import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-femme-actions',
  templateUrl: './femme-actions.component.html',
  styleUrls: ['./femme-actions.component.css']
})
export class FemmeActionsComponent {
  constructor(private router: Router) {}
  navigateTo( route: string ): void {
    this.router.navigate([ route ]);
  }
}
