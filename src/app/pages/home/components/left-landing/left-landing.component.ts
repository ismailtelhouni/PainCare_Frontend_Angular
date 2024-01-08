import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-landing',
  templateUrl: './left-landing.component.html',
  styleUrls: ['./left-landing.component.css']
})
export class LeftLandingComponent {

  constructor(
    private router: Router,
  ){}

  navigateTo( route: string ): void {
    this.router.navigate([ route ]);
  }
}
