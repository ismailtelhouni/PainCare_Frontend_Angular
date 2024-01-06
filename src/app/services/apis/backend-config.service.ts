import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendConfigService {
    private backendHost: string = environment.backendHost;

    getBackendHost(): string {
      return this.backendHost;
    }
}