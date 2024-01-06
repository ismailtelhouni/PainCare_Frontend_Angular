// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticatedUser = { email: 'hussien.chakra@gmail.com', password: 'Azerreza' };
  private sessionStorageKey = 'authSession';
  private sessionStorageLogin = 'loginSession';
  private sessionId: number | null = null;
  private isAuthenticatedValue = false;

  authenticate(email: string, password: string): boolean {
    if (email === this.authenticatedUser.email && password === this.authenticatedUser.password) {
      this.sessionId = 1;
      this.storeSession();
      this.isAuthenticatedValue = true;
      return true;
    }
    return false;
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
    this.isAuthenticatedValue = false;
    this.removeSession();
  }

  private storeSession(): void {
    localStorage.setItem(this.sessionStorageKey, JSON.stringify({ sessionId: this.sessionId }));
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
  }
}
