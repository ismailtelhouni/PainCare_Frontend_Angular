import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfigService } from '../apis/backend-config.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticDataService {

  backendHost = this.backendConfigService.getBackendHost();

  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService,
    private authService: AuthService
    ) {}

  submitDiagnosticTest(selectedChoices: any,sessionId: number, userId: number): Observable<any> {

    const apiUrl = `${this.backendHost}/tests`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Session-ID': sessionId,
      'User-ID': userId,
    });

    const options = { headers };

    // You might need to adjust the request structure based on your backend's expectations
    // const requestData = { selectedChoices };

    return this.http.post<any>(apiUrl,selectedChoices,options);
  }

  getLastDiagnosticTest(femmeId: any): Observable<any> {
    const apiUrl = `${this.backendHost}/tests/femme/${femmeId}`;

    const token = this.authService.getSessionId();  // Replace 'yourAuthTokenKey' with the key you use to store the token

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Adjust based on your token mechanism
        },
      };

      console.log("tooooooooooooooooooooookeeeeeeeeeeeeeeeeeeeen t t t t  tt t t  t t: ",token);

    return this.http.get(apiUrl,options);
  }
}
