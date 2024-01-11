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

  private sessionStorageKey = 'authSession';
  private sessionStorageId = 'userIdSession';
  private sessionStorageFemmeId = 'femmeIdSession';
  private sessionStorageLogin = 'loginSession';
  private sessionId: number | null = null;
  private femmeId: number | null = null;
  private userId: number | null = null;
  private isAuthenticatedValue = false;

  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService
    ) {}

  authenticateBackend(email: string, password: string): Observable<any> {
    const authData = { email, password };
    const apiUrl = `${this.backendHost}/api/auth/login`;
    return this.http.post<any>(apiUrl, authData);
  }

  async authenticate(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
    this.authenticateBackend(email, password).subscribe(
      (response) => {
        if (response.message=='success') {
          // Authentication successful
          const sessionId = response.token;
          const userId = response.userId;
          const femmeId = response.femmeId;
          this.sessionId = sessionId;
          this.userId = userId;
          this.femmeId = femmeId;
          this.storeSession();
          this.isAuthenticatedValue = true;
          console.log("succes login");
          console.log(response);
          console.log(this.userId);
          resolve(true);
        } else {
          // Authentication failed
          console.error('Authentication failed');
          resolve(false);
        }
      },
      (error) => {
        console.error('Error during authentication:', error);
        resolve(false);
      }
    );
  });
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
        this.isAuthenticatedValue=false;
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

  getUserId(): number | null {
    if (this.userId === null) {
      this.loadId();
    }
    return this.userId;
  }
  getFemmeId(): number | null {
    if (this.femmeId === null) {
      this.loadFemmeId();
    }
    return this.femmeId;
  }

  logout(): void {
    this.sessionId = null;
    this.userId = null;
    this.isAuthenticatedValue = false;
    this.removeSession();
  }

  private storeSession(): void {
    localStorage.setItem(this.sessionStorageKey, JSON.stringify({ sessionId: this.sessionId }));
    localStorage.setItem(this.sessionStorageFemmeId, JSON.stringify({ femmeId: this.femmeId }));
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


  private loadId(): void {
    const storedSession = localStorage.getItem(this.sessionStorageId);
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      if (parsedSession && parsedSession.userId) {
        this.userId = parsedSession.userId;
        this.isAuthenticatedValue = true;
      } else {
        // If the stored session is invalid or incomplete, remove it
        this.removeSession();
      }
    }
  }

  private loadFemmeId(): void {
    const storedSession = localStorage.getItem(this.sessionStorageFemmeId);
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      if (parsedSession && parsedSession.femmeId) {
        this.femmeId = parsedSession.femmeId;
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
    localStorage.removeItem(this.sessionStorageFemmeId);
    localStorage.removeItem(this.sessionStorageLogin);
  }
}
