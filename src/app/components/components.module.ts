import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { ListBlogsComponent } from './list-blogs/list-blogs.component';
import { ScoreComponent } from './score/score.component';
import { FemmeActionsComponent } from './femme-actions/femme-actions.component';



@NgModule({
  declarations: [
    NavbarComponent,
    TopBarComponent,
    ListArticlesComponent,
    ArticleCardComponent,
    BlogCardComponent,
    ListBlogsComponent,
    ScoreComponent,
    FemmeActionsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    ListArticlesComponent,
    ListBlogsComponent,
    ScoreComponent,
    FemmeActionsComponent
  ]
})
export class ComponentsModule { }
