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
import { FormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ContainerFormComponent } from './container-form/container-form.component';
import { BlogCardSecondaireComponent } from './blog-card-secondaire/blog-card-secondaire.component';
import { FooterComponent } from './footer/footer.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    NavbarComponent,
    TopBarComponent,
    ListArticlesComponent,
    ArticleCardComponent,
    BlogCardComponent,
    ListBlogsComponent,
    ScoreComponent,
    FemmeActionsComponent,
    ContainerFormComponent,
    BlogCardSecondaireComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    NavbarComponent,
    ListArticlesComponent,
    ListBlogsComponent,
    ScoreComponent,
    FemmeActionsComponent,
    ContainerFormComponent,
    BlogCardSecondaireComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
