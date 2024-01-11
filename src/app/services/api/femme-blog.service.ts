import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendConfigService } from '../apis/backend-config.service';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class FemmeBlogService {

  backendHost = this.backendConfigService.getBackendHost();
  constructor(
    private http: HttpClient,
    private backendConfigService: BackendConfigService,
    private auth: AuthService
  ) { }

  addBlog(imageFile: File , title:string , description:string): Observable<any> {

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('imageFile', imageFile);
    const token = this.auth.getSessionId();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.backendHost}/blogs`, formData, { headers });
  }

  getBlogFemme(){

    const token = this.auth.getSessionId();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.backendHost}/blogs/myblogs`, { headers })

  }

  getImage(imageName: string): Observable<Blob> {

    const token = this.auth.getSessionId();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    const options = {
      headers: headers,
      responseType: 'blob' as 'json' // Make sure to set responseType correctly
    };

    return this.http.get(this.backendHost + encodeURIComponent(imageName),options) as  Observable<Blob>
  }

  getBlog(){

    const token = this.auth.getSessionId();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.backendHost}/blogs`, { headers })

  }

}
