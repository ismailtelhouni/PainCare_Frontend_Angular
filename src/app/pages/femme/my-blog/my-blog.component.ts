import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog.model';
import { FemmeBlogService } from 'src/app/services/api/femme-blog.service';
import { NavigationService } from 'src/app/services/utils/navigation';

@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.css']
})
export class MyBlogComponent implements OnInit {

  blogsHoriz : Blog[]= [] ;
  blogs : Blog[]= [] ;

  constructor(
    private blogService:FemmeBlogService,
    private navigate : NavigationService
  ){}

  ngOnInit(): void {

    this.loadBlogs();

  }

  loadBlogs() {
    this.blogService.getBlogFemme().subscribe(
      data => {
        const allBlogs = data as Blog[];
        const reversedBlogs = allBlogs.reverse();
        console.log(reversedBlogs)
        // Affectez les trois premiers blogs à blogsHoriz
        this.blogsHoriz = reversedBlogs.slice(0, 1);

        // Affectez le reste des blogs à blogs
        this.blogs = reversedBlogs.slice(1);


      },
      error => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

  navigateTo(path:string){
    this.navigate.navigateTo(path)
  }

}
