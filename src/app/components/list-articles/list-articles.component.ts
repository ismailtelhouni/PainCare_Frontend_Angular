import { Component } from '@angular/core';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent {
  articles = [
    { id: 1, title: 'first' },
    { id: 2, title: 'test 2' },
    { id: 3, title: 'Article 3' },
    { id: 4, title: 'Article 4' },
    { id: 5, title: 'Article 5' },
  ];

}
