// upload.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BackendConfigService } from './backend-config.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService
    ) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const backendHost = this.backendConfigService.getBackendHost();
    const apiUrl = `${backendHost}/api/images/`;

    return this.http.post<any>(`${apiUrl}`, formData);
  }
}
