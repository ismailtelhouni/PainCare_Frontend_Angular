import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  image: String = "assets/img/login.jpg";
  routePath: String = "/register"
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  async onSubmit(): Promise<void> {
    const isAuthenticated = await this.authService.authenticate(this.email, this.password);

    console.log(isAuthenticated);
    
    if (isAuthenticated) {
      const sessionId = this.authService.getSessionId();
      if (sessionId !== null) {
        // Navigate to the dashboard page without exposing the session ID in the URL
        this.router.navigate(['/dashboard']);
      }
    } else {
      // Display an error message (you can customize this part based on your UI)
      alert('Invalid email or password. Please try again.');
    }
  }
}
