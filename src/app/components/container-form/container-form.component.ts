import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container-form',
  templateUrl: './container-form.component.html',
  styleUrls: ['./container-form.component.css']
})
export class ContainerFormComponent {
  @Input() imagetest: String='';
}
