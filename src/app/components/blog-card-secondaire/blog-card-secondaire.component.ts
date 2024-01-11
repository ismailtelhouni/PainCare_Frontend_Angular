import { Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BackendConfigService } from 'src/app/services/apis/backend-config.service';

@Component({
  selector: 'app-blog-card-secondaire',
  templateUrl: './blog-card-secondaire.component.html',
  styleUrls: ['./blog-card-secondaire.component.css']
})
export class BlogCardSecondaireComponent {

  @Input() title:string="";

  @Input() description:string="";

  @Input() image:string="";

  @Input() blog_date:string="";

  @Input() nbrCommantaire:string="";

  @Input() id:number=0;

  imageSrc: SafeUrl='';

  @Input() backendHost = this.backendConfigService.getBackendHost();

  constructor(
    private backendConfigService: BackendConfigService,
    private router: Router,
  ) {}

  navigateTo( route: Number ): void {
    this.router.navigate(['blog'], { queryParams: { id: route } });
  }




}
