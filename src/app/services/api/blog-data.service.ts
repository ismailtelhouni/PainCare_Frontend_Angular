import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfigService } from '../apis/backend-config.service';

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {

  backendHost = this.backendConfigService.getBackendHost();

  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService
    ) {}

  getBlogs(): Observable<any[]> {
    const apiUrl = `${this.backendHost}/api/allBlogs`;

    // Include session ID and user ID in the request headers or parameters
    const options = {
      headers: {
      },
    };
    
    return this.http.get<any[]>(apiUrl,options);
  }

  getBlogById(blogId: number): Observable<any> {

    const apiUrl = `${this.backendHost}/api/Blogs/${blogId}`;

    // Include session ID and user ID in the request headers or parameters
    const options = {
      headers: {
      },
    };
    return this.http.get<any[]>(apiUrl,options);
  }
}
