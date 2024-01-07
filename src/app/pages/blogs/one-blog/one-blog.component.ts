import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables  } from 'chart.js';
import 'chartjs-plugin-datalabels';
import { BlogDataService } from 'src/app/services/api/blog-data.service';

@Component({
  selector: 'app-one-blog',
  templateUrl: './one-blog.component.html',
  styleUrls: ['./one-blog.component.css']
})
export class OneBlogComponent implements OnInit{

  blog: { id: number, title: string } = { id: 1, title: '' };


  constructor(
    private route: ActivatedRoute,
    private blogDataService: BlogDataService
    ) {}

  title = 'chartDemo';
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const blogId = params['id'];

      // Use the BlogService to fetch the blog from the backend
      // this.blogDataService.getBlogById(blogId).subscribe(
      //   (blog) => {
      //     this.blog = blog;
      //   },
      //   (error) => {
      //     console.error('Error fetching blog:', error);
      //   }
      //   );

        if (blogId == 1) {
          this.blog = { id: 1, title: 'blog1' };
        } else {
          this.blog = { id: 2, title: 'blog2' };
        }

      });
  }
}
