import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarDialogComponent } from '../new-femme/components/avatar-dialog/avatar-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/api/user-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface FormDataE {
  nom: string,
  prenom: string,
  profil: string,
  ville: string,
  rue_adresse: string,
  numero_adresse: string,
  numero_telephone: string,
  numero_cin: string,
  user: {
    email: string
  }
};

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
  formdata: FormDataE = {nom: '',
    prenom: '',
    profil: '',
    ville: '',
    rue_adresse: '',
    numero_adresse:'',
    numero_telephone:'',
    numero_cin:'',
    user: {
      email: ''
    }
  };


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
   'ville': [
    { type: 'required', message: 'Ville is required.' }
  ],
 };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private userDataService: UserDataService,
    private snackBar: MatSnackBar
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
        this.item.ville = response.ville;
        this.createForm();
      },
      (error) => {
        console.error('Error fetching pain levels:', error);
      }
    );



    console.log();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name],
      surname: [this.item.surname],
      email: [this.item.email],
      ville: [this.item.ville]
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

  resetFields(){
    this.exampleForm = this.fb.group({
      name: new FormControl(this.item.name, Validators.required),
      surname: new FormControl(this.item.surname, Validators.required),
      email: new FormControl(this.item.email, Validators.required),
      ville: new FormControl(this.item.ville, Validators.required),
    });
  }

  onSubmit(value:any){

    console.log(this.item);
    const formData = {
      nom: value.surname,
      prenom: value.name,
      profil: this.item.avatar,
      ville: value.ville,
      rue_adresse: value.rue_adresse || '',
      numero_adresse: value.numero_adresse || '',
      numero_telephone: value.numero_telephone || '',
      numero_cin: value.numero_cin || '',
      user: {
        email: value.email
      }
    };
  
    console.log('Form Data:', formData);

    // Assuming you have femmeId available
    const femmeId = this.authService.getFemmeId();

    this.userDataService.updateFemmeProfile(femmeId, formData).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        // You can perform additional actions if needed
        this.showSuccessSnackBar('Profile updated successfully');
        this.resetFields();
      },
      (error) => {
        console.error('Error updating profile:', error);
        // Handle the error appropriately
      }
    );

  }

  private showSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Snackbar duration in milliseconds
      panelClass: ['success-snackbar'], // Add your custom CSS class for styling
    });
  }

  delete(){

  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
