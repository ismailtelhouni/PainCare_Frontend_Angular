// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendConfigService } from './backend-config.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryDataService {

  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService
    ) {}

  getAllCategories(): Observable<any[]> {
    const backendHost = this.backendConfigService.getBackendHost();
    const apiUrl = `${backendHost}/api/categories`;
    return this.http.get<any[]>(`${apiUrl}`);
  }
}
