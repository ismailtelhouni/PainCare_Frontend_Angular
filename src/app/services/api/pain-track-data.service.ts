import { Injectable } from '@angular/core';
import { BackendConfigService } from '../apis/backend-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PainTrackDataService {

  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService,
    private auth: AuthService
  ) {}

  sendTrackData(trackData: any,sessionId: number, userId: number): Observable<any> {

    const backendHost = this.backendConfigService.getBackendHost();
    const apiUrl = `${backendHost}/diagnostics`;

    const token = this.auth.getSessionId();  // Replace 'yourAuthTokenKey' with the key you use to store the token

    const options = {
      headers: {
          'Authorization': 'Bearer ' + token,  // Adjust based on your token mechanism
          },
      };

    return this.http.post<any>(apiUrl, trackData, options);
  }
}
