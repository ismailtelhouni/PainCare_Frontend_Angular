import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfigService } from '../apis/backend-config.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreDataService {

  backendHost = this.backendConfigService.getBackendHost();

  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService
    ) {}

  getScoreValue(userId: string): Observable<number> {

    const apiUrl = `${this.backendHost}/api/getScoreValue`;

    return this.http.get<number>(apiUrl, { params: { userId } });
  }
}
