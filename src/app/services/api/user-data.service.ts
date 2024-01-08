import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BackendConfigService } from '../apis/backend-config.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  backendHost = this.backendConfigService.getBackendHost();

  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService,
    private auth: AuthService
    ) {}

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.backendHost}/api/auth/register`, user).pipe(
      tap((response) => {
        // Assuming that the response has 'sessionId' and 'userId' properties
        // const { sessionId, userId } = response;
        const sessionId = response.token;
        const userId = response.id;

        console.log("user createeed", userId," session", sessionId)


        // Store 'sessionId' and 'userId' in local storage
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('userId', userId);

        localStorage.setItem('authSession', JSON.stringify({ sessionId }));
        localStorage.setItem('userIdSession', JSON.stringify({ userId }));
        localStorage.setItem('loginSession', 'true');
        
      })
    );
  }

  getFemmeById(femmeId: any): Observable<any> {

    const apiUrl = `${this.backendHost}/femmes/id/${femmeId}`;

    const token = this.auth.getSessionId();  // Replace 'yourAuthTokenKey' with the key you use to store the token

    const options = {
      headers: {
          'Authorization': 'Bearer ' + token,  // Adjust based on your token mechanism
          },
      };
    return this.http.get<any>(apiUrl,options);
  }
}
