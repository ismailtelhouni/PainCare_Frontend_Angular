import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})
export class ListBlogsComponent {
  constructor(private router: Router) {}
  navigateTo( route: Number ): void {
    this.router.navigate(['blog'], { queryParams: { id: route } });
  }

  blogs = [
    { id: 1, title: 'first' },
    { id: 2, title: 'test 2' },
    { id: 3, title: 'blog 3' },
    { id: 4, title: 'blog 4' },
    { id: 5, title: 'blog 5' },
  ];
}
