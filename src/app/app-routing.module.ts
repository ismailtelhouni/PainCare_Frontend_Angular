import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { OneBlogComponent } from './pages/blogs/one-blog/one-blog.component';
import { TrackComponent } from './pages/femme/track/track.component';

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
    path:"track",
    component:TrackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
