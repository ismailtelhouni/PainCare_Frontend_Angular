import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables  } from 'chart.js';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-one-blog',
  templateUrl: './one-blog.component.html',
  styleUrls: ['./one-blog.component.css']
})
export class OneBlogComponent implements OnInit{

  blog: { id: number, title: string } = { id: 1, title: '' };


  constructor(private route: ActivatedRoute) {}

  title = 'chartDemo';
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const blogId = params['id'];
      if (blogId == 1) {
        this.blog = { id: 1, title: 'blog1' };
      } else {
        this.blog = { id: 2, title: 'blog2' };
      }
    });


    Chart.register(...registerables);

    // Assuming you have a list of pain levels
    const painLevels = [3, 6, 2, 8, 5, 7, 4, 9, 1, 10];

    // Creating the chart
    const myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: painLevels.map((_, index) => `Point ${index + 1}`),
        datasets: [{
          label: 'Pain Levels',
          data: painLevels,
          backgroundColor: "#0196FD",
          borderColor: "#0196FD",
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 10  // Set the maximum value of the y-axis to 10
          }
        },
        plugins: { 
          title: {
          display: true,
          text: 'Pain Diagnostic',
          font: {
            size: 16
          }
          },
          // datalabels: {
          //   anchor: 'end',
          //   align: 'end',
          //   offset: { x: 8, y: 0 },
          //   font: { size: 12 },
          //   formatter: (value: any, context: any) => value
          // }
      }
      }
    });
  }
}
