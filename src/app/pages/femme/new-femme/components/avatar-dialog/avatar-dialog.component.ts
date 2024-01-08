import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.css']
})
export class AvatarDialogComponent implements OnInit {

  avatars: Array<any> = new Array<any>();

  constructor(
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    // this.firebaseService.getAvatars()
    // .subscribe(data => this.avatars = data);
    this.avatars = [
      {'link':'../../../../../../assets/images/avatar2.png'},
      {'link':'../../../../../../assets/images/avatar3.png'},
      {'link':'../../../../../../assets/images/avatar4.png'},
      {'link':'../../../../../../assets/images/avatar5.png'},
      {'link':'../../../../../../assets/images/avatar6.png'},
    ]
  }

  close(avatar:any){
    this.dialogRef.close(avatar);
  }

}