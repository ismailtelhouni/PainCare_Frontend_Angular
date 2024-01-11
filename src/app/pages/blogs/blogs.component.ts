import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog.model';
import { FemmeBlogService } from 'src/app/services/api/femme-blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogs : Blog[]= [] ;

  constructor(

    private blogService:FemmeBlogService

  ){}

  ngOnInit(): void {

    this.loadBlogs();

  }

  loadBlogs() {
    this.blogService.getBlog().subscribe(
      data => {
        const allBlogs = data as Blog[];
        const reversedBlogs = allBlogs.reverse();
        console.log(reversedBlogs)

        this.blogs = reversedBlogs;


      },
      error => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

}
