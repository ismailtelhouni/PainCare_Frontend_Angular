import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}
  navigateTo( route: string ): void {
    this.router.navigate([ route ]);
  }

  navItems = [
    { label: 'Home', link: '/home' },
    { label: 'Articles', link: '/articles' },
    { label: 'Blogs', link: '/blogs' },
    { label: 'other', link: '/other' },
  ];

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
