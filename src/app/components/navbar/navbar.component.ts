import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private authService: AuthService) {}
  navigateTo( route: string ): void {
    this.router.navigate([ route ]);
  }

  selectedLanguage: any = 'en'; // Default language

  onLanguageChange(event: Event) {
    // Extract the selected value from the event
    const selectedValue = (event.target as HTMLSelectElement).value;

    // Update the selected language
    this.selectedLanguage = selectedValue;

    // Implement additional logic if needed
    console.log('Selected Language:', this.selectedLanguage);
  }


  isAuthenticated = this.authService.isAuthenticated();

  // Initial navItems property
  originalNavItems = [
    { label: 'Home', link: '/home' },
    { label: 'Articles', link: '/articles' },
    { label: 'Blogs', link: '/blogs' },
    { label: 'Login', link: '/login' },
  ];

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  getModifiedNavItems(): any[] {
    const isAuthenticated = this.authService.isAuthenticated();

    // Create a copy of the original navItems array
    const modifiedNavItems = [...this.originalNavItems];
    
    // Find the "Login" item and update its label based on the session status
    const loginItemIndex = modifiedNavItems.findIndex(item => item.label === 'Login');
    if (loginItemIndex !== -1) {
      modifiedNavItems[loginItemIndex].label = isAuthenticated ? 'Logout' : 'Login';
    }

    // const dashboardItemIndex = modifiedNavItems.findIndex(item => item.label === 'Dashboard');
    // // Add "Dashboard" link if the user is authenticated
    // if (dashboardItemIndex== -1 && isAuthenticated) {
    //   modifiedNavItems.push({ label: 'Dashboard', link: '/dashboard' });
    // }

    return modifiedNavItems;
  }

  // Use the getModifiedNavItems() method in your template to dynamically update the navItems
  get navItems(): any[] {
    return this.getModifiedNavItems();
  }

  // Logout function
  logout(): void {
    this.authService.logout();
    this.navigateTo('/login'); // Redirect to the login page or any other desired page after logout
  }
}
