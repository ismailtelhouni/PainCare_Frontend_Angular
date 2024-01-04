import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LeftLandingComponent } from './home/components/left-landing/left-landing.component';
import { RightLandingComponent } from './home/components/right-landing/right-landing.component';
import { ComponentsModule } from "../components/components.module";
import { ArticlesComponent } from './articles/articles.component';
import { BlogsComponent } from './blogs/blogs.component';
import { OneBlogComponent } from './blogs/one-blog/one-blog.component';
import { TrackComponent } from './femme/track/track.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        HomeComponent,
        LeftLandingComponent,
        RightLandingComponent,
        ArticlesComponent,
        BlogsComponent,
        OneBlogComponent,
        TrackComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule
    ]
})
export class PagesModule { }
