import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private backendUrl = 'YOUR_BACKEND_URL'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/api/users`, user).pipe(
      tap((response) => {
        // Assuming that the response has 'sessionId' and 'userId' properties
        const { sessionId, userId } = response;

        // Store 'sessionId' and 'userId' in local storage
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('userId', userId);

        localStorage.setItem('authSession', JSON.stringify({ sessionId }));
        localStorage.setItem('userIdSession', JSON.stringify({ userId }));
        localStorage.setItem('loginSession', 'true');
      })
    );
  }
}
