import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getPainData(sessionId: number, userId: number): Observable<any[]> {

    const backendHost = this.backendConfigService.getBackendHost();
    const apiUrl = `${backendHost}/api/pain`;

    // Include session ID and user ID in the request headers or parameters
    const options = {
      headers: {
        'Session-ID': sessionId.toString(),
        'User-ID': userId.toString(),
      },
    };
    
    return this.http.get<any[]>(apiUrl,options);
  }

  getPainLevelData(sessionId: any, userId: number): Observable<any[]> {

    const backendHost = this.backendConfigService.getBackendHost();
    const apiUrl = `${backendHost}/api/painLevel`;

    // Include session ID and user ID in the request headers or parameters
    const options = {
      headers: {
        'Session-ID': sessionId.toString(),
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