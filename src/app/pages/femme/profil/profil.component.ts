import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarDialogComponent } from '../new-femme/components/avatar-dialog/avatar-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/api/user-data.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  
  exampleForm: FormGroup = new FormGroup({});
  item: any = {
    'avatar':'avatar1.png'
  }; ;

  femmeId:Number|null = null;


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' }
    ],
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'surname': [
     { type: 'required', message: 'Surname is required.' }
   ],
 };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private userDataService: UserDataService
  ) { }

  ngOnInit() {

    this.femmeId = this.authService.getFemmeId();


    this.userDataService.getFemmeById(this.femmeId).subscribe(
      (response) => {
        console.log("femeeeNaaaaaaaaaaaaaaaaaaammmmmmmmmmmeeeeeeeeeee", response)
        this.item.email = response.user.email;
        this.item.name = response.prenom;
        this.item.surname = response.nom;
        this.item.avatar = response.profil;
      },
      (error) => {
        console.error('Error fetching pain levels:', error);
      }
    );



    console.log()
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      surname: [this.item.surname, Validators.required],
      email: [this.item.email, Validators.required]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.item.avatar = result.link;
      }
    });
  }

  onSubmit(value:any){
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
  }

  delete(){

  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
