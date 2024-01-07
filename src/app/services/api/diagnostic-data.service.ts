import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfigService } from '../apis/backend-config.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticDataService {

  backendHost = this.backendConfigService.getBackendHost();

  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService
    ) {}

  submitDiagnosticTest(selectedChoices: any,sessionId: number, userId: number): Observable<any> {

    const apiUrl = `${this.backendHost}/api/submitDiagnosticTest`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Session-ID': sessionId,
      'User-ID': userId,
    });

    const options = { headers };

    // You might need to adjust the request structure based on your backend's expectations
    const requestData = { selectedChoices };

    return this.http.post<any>(apiUrl,requestData,options);
  }
}
