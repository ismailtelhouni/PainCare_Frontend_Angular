import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LeftLandingComponent } from './home/components/left-landing/left-landing.component';
import { RightLandingComponent } from './home/components/right-landing/right-landing.component';
import { ComponentsModule } from "../components/components.module";
import { ArticlesComponent } from './articles/articles.component';
import { BlogsComponent } from './blogs/blogs.component';
import { OneBlogComponent } from './blogs/one-blog/one-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FemmeDashboardComponent } from './femme/femme-dashboard/femme-dashboard.component';
import { PainTrackComponent } from './femme/pain-track/pain-track.component';
import { LoginComponent } from './login/login.component';
import { DiagnosticTestComponent } from './femme/diagnostic-test/diagnostic-test.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NewFemmeComponent } from './femme/new-femme/new-femme.component';
import { AvatarDialogComponent } from './femme/new-femme/components/avatar-dialog/avatar-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



// AoT requires an export function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
    declarations: [
        HomeComponent,
        LeftLandingComponent,
        RightLandingComponent,
        ArticlesComponent,
        BlogsComponent,
        OneBlogComponent,
        FemmeDashboardComponent,
        PainTrackComponent,
        LoginComponent,
        DiagnosticTestComponent,
        NewFemmeComponent,
        AvatarDialogComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient],
            },
        }),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule
        
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }, // Optional: You can customize options
      ],
})
export class PagesModule { }
