import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendConfigService } from './backend-config.service';

@Injectable({
  providedIn: 'root',
})
export class PainDataService {
  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService
    ) {}

  getPainData(sessionId: number, userId: any): Observable<any[]> {

    const backendHost = this.backendConfigService.getBackendHost();
    const apiUrl = `${backendHost}/diagnostics/byfemme/${userId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': sessionId,
      'User-ID': userId,
    });

    const options = { headers };
    
    return this.http.get<any[]>(apiUrl,options);
  }

  getPainLevelData(sessionId: any, userId: any): Observable<any[]> {

    const backendHost = this.backendConfigService.getBackendHost();
    const apiUrl = `${backendHost}/diagnostics/byfemme/${userId}`;


    const options = {
      headers: {
          'Authorization': 'Bearer ' + sessionId,  // Adjust based on your token mechanism
          'User-ID': userId.toString(),
          },
      };
    
    return this.http.get<any[]>(apiUrl,options);
  }

  getPainLocationsData(sessionId: any, userId: number): Observable<any[]> {

    const backendHost = this.backendConfigService.getBackendHost();
    const apiUrl = `${backendHost}/api/painLocations`;

    // Include session ID and user ID in the request headers or parameters
    const options = {
      headers: {
        'Session-ID': sessionId.toString(),
        'User-ID': userId.toString(),
      },
    };
    
    return this.http.get<any[]>(apiUrl,options);
  }
}