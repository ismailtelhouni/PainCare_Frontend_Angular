import { Component } from '@angular/core';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent {
  articles = [
    { id: 1, title: 'HEALTH IN HER HUE RAISES $3 MILLION TO EXPAND HEALTHCARE PLATFORM FOR WOMEN OF COLOR', description:"The women’s health startup Health in Her HUE announced a $3 million seed funding round on Jan. 8, led by venture capital firm Seae Ventures",image:"article1.png" },
    { id: 2, title: 'Drug resistance, HIV hampering fight against tuberculosis in Moldova', description:"Welcome to the first Euractiv’s health newsletter in 2024. Some key files for health are in store in the coming months, with the European Health Data Space (EHDS) and ongoing revision of the pharmaceutical strategy",image:"article4.png" },
    { id: 3, title: 'Living with Hashimoto’s disease', description:"Did you know it can take as long as 10 years to properly diagnose someone (especially women) with Hashimoto’s disease – a condition affecting your thyroid gland?",image:"article5.png" },
    { id: 4, title: "Sinéad O'Connor Died from 'Natural Causes,' Says London Coroner", description:"The Irish singer, who became a household name with the release of her cover of 'Nothing Compares 2 U,' died at the age of 56 in July 2023",image:"article2.png" },
    { id: 5, title: 'In Vitro Fertilization: Tests to be performed before you plan IVF', description:"Here's a thorough knowledge about the various tests required before IVF, addressing the needs of both men and women",image:"article3.png" },
  ];

}
