import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/blog.model';
import { BlogDataService } from 'src/app/services/api/blog-data.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})
export class ListBlogsComponent {

  @Input() blogs : Blog[]= [] ;

  constructor(
    private router: Router,
    private blogDataService: BlogDataService
    ) {}
  navigateTo( route: Number ): void {
    this.router.navigate(['blog'], { queryParams: { id: route } });
  }

  // ngOnInit(): void {
  //   this.loadBlogs();
  // }

  // private loadBlogs(): void {
  //   this.blogDataService.getBlogs().subscribe(
  //     (blogs) => {
  //       this.blogs = blogs;
  //     },
  //     (error) => {
  //       console.error('Error fetching blogs:', error);
  //     }
  //   );
  // }
}
