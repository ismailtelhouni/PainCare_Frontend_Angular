// auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfigService } from './apis/backend-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  backendHost = this.backendConfigService.getBackendHost();

  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService
    ) {}

  authenticateBackend(email: string, password: string): Observable<any> {
    const authData = { email, password };
    const apiUrl = `${this.backendHost}/api/auth/login`;
    return this.http.post<any>(apiUrl, authData);
  }

  private authenticatedUser = { email: 'hussien.chakra@gmail.com', password: 'Azerreza' };
  private sessionStorageKey = 'authSession';
  private sessionStorageId = 'userIdSession';
  private sessionStorageLogin = 'loginSession';
  private sessionId: number | null = null;
  private userId: number | null = null;
  private isAuthenticatedValue = false;

  authenticate(email: string, password: string): boolean {
    this.authenticateBackend(email, password).subscribe(
      (response) => {
        if (response.success) {
          // Authentication successful
          const { sessionId, userId } = response;
          this.sessionId = sessionId;
          this.userId = userId;
          this.storeSession();
          this.isAuthenticatedValue = true;
        } else {
          // Authentication failed
          console.error('Authentication failed');
        }
      },
      (error) => {
        console.error('Error during authentication:', error);
      }
    );

    // if (email === this.authenticatedUser.email && password === this.authenticatedUser.password) {
    //   this.sessionId = 1;
    //   this.storeSession();
    //   this.isAuthenticatedValue = true;
    //   return true;
    // }
    // return false;

    return this.isAuthenticatedValue;
  }

  isAuthenticated(): boolean {
    const storedSession = localStorage.getItem(this.sessionStorageKey);
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      if (parsedSession && parsedSession.sessionId) {
        this.sessionId = parsedSession.sessionId;
        this.isAuthenticatedValue = true;
      } else {
        // If the stored session is invalid or incomplete, remove it
        this.removeSession();
      }
    }
    return this.isAuthenticatedValue;
  }

  getSessionId(): number | null {
    if (this.sessionId === null) {
      this.loadSession();
    }
    return this.sessionId;
  }

  logout(): void {
    this.sessionId = null;
    this.userId = null;
    this.isAuthenticatedValue = false;
    this.removeSession();
  }

  private storeSession(): void {
    localStorage.setItem(this.sessionStorageKey, JSON.stringify({ sessionId: this.sessionId }));
    localStorage.setItem(this.sessionStorageId, JSON.stringify({ userId: this.userId }));
    localStorage.setItem(this.sessionStorageLogin, 'true');
  }

  private loadSession(): void {
    const storedSession = localStorage.getItem(this.sessionStorageKey);
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      if (parsedSession && parsedSession.sessionId) {
        this.sessionId = parsedSession.sessionId;
        this.isAuthenticatedValue = true;
      } else {
        // If the stored session is invalid or incomplete, remove it
        this.removeSession();
      }
    }
  }

  private removeSession(): void {
    localStorage.removeItem(this.sessionStorageKey);
    localStorage.removeItem(this.sessionStorageId);
  }
}
