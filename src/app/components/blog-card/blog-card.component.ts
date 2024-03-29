import { Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { BackendConfigService } from 'src/app/services/apis/backend-config.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent {
  @Input() title: string = '';
  @Input() i: number = 7;

  @Input() description:string="";

  @Input() image:string="";

  @Input() blog_date:string="";

  @Input() nbrCommantaire:string="";

  @Input() id:number=0;

  imageSrc: SafeUrl='';

  @Input() backendHost = this.backendConfigService.getBackendHost();

  constructor(
    private backendConfigService: BackendConfigService,
  ) {}


}
