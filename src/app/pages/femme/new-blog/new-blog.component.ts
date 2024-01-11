import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FemmeBlogService } from 'src/app/services/api/femme-blog.service';
import { NavigationService } from 'src/app/services/utils/navigation';


@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css'],
})

export class NewBlogComponent {

  image : String = "../../../assets/images/add_blog.png";

  blogForm: FormGroup= new FormGroup({});

  value : any;

  selectedFile: File | null = null;

  error: string="";

  fileUpload = { status: '', message: 0, filePath: '' };

  validation_messages = {
    'title': [
      { type: 'required', message: 'Title is required.' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' }
    ],
    'image': [
      { type: 'required', message: 'Image is required.' }
    ]
 };

  constructor(
    private fb: FormBuilder ,
    private blogService : FemmeBlogService,
    private navigation:NavigationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onSubmit(){
    const blogDto = this.blogForm.value;
    if (this.selectedFile != null) {
      this.blogService.addBlog(this.selectedFile, blogDto.title, blogDto.description)
      .subscribe(response => {
        console.log(response);

        this.toastr.success("Success","Success! The addition of the blog has been completed.")
        this.navigation.navigateTo("/dashboard")
        // Traitez la réponse du backend ici
      }, error => {
        console.error(error);
        // Gérez les erreurs ici
      });
    }
    else{
      console.log("You not Choose file.")
    }

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log(event.target.files[0] as File)
  }

  resetFields(){
    this.blogForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

}
