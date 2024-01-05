import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LeftLandingComponent } from './home/components/left-landing/left-landing.component';
import { RightLandingComponent } from './home/components/right-landing/right-landing.component';
import { ComponentsModule } from "../components/components.module";
import { ArticlesComponent } from './articles/articles.component';
import { BlogsComponent } from './blogs/blogs.component';
import { OneBlogComponent } from './blogs/one-blog/one-blog.component';
import { FormsModule } from '@angular/forms';
import { FemmeDashboardComponent } from './femme/femme-dashboard/femme-dashboard.component';
import { PainTrackComponent } from './femme/pain-track/pain-track.component';



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
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule
    ]
})
export class PagesModule { }
