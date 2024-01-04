import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { ListBlogsComponent } from './list-blogs/list-blogs.component';



@NgModule({
  declarations: [
    NavbarComponent,
    TopBarComponent,
    ListArticlesComponent,
    ArticleCardComponent,
    BlogCardComponent,
    ListBlogsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    ListArticlesComponent,
    ListBlogsComponent
  ]
})
export class ComponentsModule { }
