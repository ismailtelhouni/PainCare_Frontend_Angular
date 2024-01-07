import { Injectable } from '@angular/core';
import { BackendConfigService } from '../apis/backend-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PainTrackDataService {

  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService
  ) {}

  sendTrackData(trackData: any,sessionId: number, userId: number): Observable<any> {

    const backendHost = this.backendConfigService.getBackendHost();
    const apiUrl = `${backendHost}/api/track`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Session-ID': sessionId,
      'User-ID': userId,
    });

    const options = { headers };

    return this.http.post<any>(apiUrl, trackData, options);
  }
}
