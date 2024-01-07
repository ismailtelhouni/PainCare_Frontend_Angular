import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from "./components/avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/api/user-data.service';


interface User {
  name: string;
  surname: string;
  age: number;
}

@Component({
  selector: 'app-new-femme',
  templateUrl: './new-femme.component.html',
  styleUrls: ['./new-femme.component.scss']
})
export class NewFemmeComponent implements OnInit{
  exampleForm: FormGroup = new FormGroup({});
  avatarLink: string = "../../../../assets/images/avatar1.png";

  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'surname': [
     { type: 'required', message: 'Surname is required.' }
   ],
   'age': [
     { type: 'required', message: 'Age is required.' },
   ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private userDataService: UserDataService
  ) { }

  navigateTo( route: string ): void {
    this.router.navigate([ route ]);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      age: ['', Validators.required ]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.avatarLink = result.link;
      }
    });
  }

  resetFields(){
    this.avatarLink = "../../../../assets/images/avatar1.png";
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }

  onSubmit(value:any){
    const user:User = {
      name:value.name,
      surname:value.surname,
      age:value.age,
    };
    
    // Send the user data to the backend
    this.userDataService.createUser(user).subscribe(
      (response) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
    console.log(user);
  }

}
