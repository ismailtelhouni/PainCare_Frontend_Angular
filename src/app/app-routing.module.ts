import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { OneBlogComponent } from './pages/blogs/one-blog/one-blog.component';
import { FemmeDashboardComponent } from './pages/femme/femme-dashboard/femme-dashboard.component';
import { PainTrackComponent } from './pages/femme/pain-track/pain-track.component';
import { LoginComponent } from './pages/login/login.component';
import { DiagnosticTestComponent } from './pages/femme/diagnostic-test/diagnostic-test.component';
import { NewFemmeComponent } from './pages/femme/new-femme/new-femme.component';
import { NewBlogComponent } from './pages/femme/new-blog/new-blog.component';
import { MyBlogComponent } from './pages/femme/my-blog/my-blog.component';

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },{
    path:"articles",
    component:ArticlesComponent
  },{
    path:"blogs",
    component:BlogsComponent
  },{
    path:"blog",
    component:OneBlogComponent
  },{
    path:"dashboard",
    component:FemmeDashboardComponent
  },{
    path:"paintrack",
    component:PainTrackComponent
  },{
    path:"diagnostictest",
    component:DiagnosticTestComponent
  },{
    path:"login",
    component:LoginComponent
  },{
    path:"newuser",
    component:NewFemmeComponent
  },{
    path:"new-blog",
    component:NewBlogComponent
  },{
    path:"my-blog",
    component:MyBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
