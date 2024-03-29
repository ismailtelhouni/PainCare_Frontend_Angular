import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from "./components/avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/api/user-data.service';


interface User {
  email: string,
  password: string,
  name: string;
  surname: string;
  profil: string;
}

@Component({
  selector: 'app-new-femme',
  templateUrl: './new-femme.component.html',
  styleUrls: ['./new-femme.component.scss']
})
export class NewFemmeComponent implements OnInit{
  exampleForm: FormGroup = new FormGroup({});
  avatarLink: string = "../../../../assets/images/avatar2.png";

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' }
    ],
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'surname': [
     { type: 'required', message: 'Surname is required.' }
   ],
  //  'age': [
  //    { type: 'required', message: 'Age is required.' },
  //  ]
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
      email: ['', Validators.required ],
      password: ['', Validators.required ],
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
    this.avatarLink = "../../../../assets/images/avatar2.png";
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(value:any){
    const user:User = {
      email: value.email,
      password: value.password,
      name:value.name,
      surname:value.surname,
      profil: this.avatarLink
    };
    
    // Send the user data to the backend
    this.userDataService.createUser(user).subscribe(
      (response) => {
        console.log("userResponse: ",response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
    console.log(user);
  }

}
