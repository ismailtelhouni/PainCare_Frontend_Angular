import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { PainDataService } from 'src/app/services/apis/pain-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-femme-dashboard',
  templateUrl: './femme-dashboard.component.html',
  styleUrls: ['./femme-dashboard.component.css']
})
export class FemmeDashboardComponent {

  sessionId: number|null = null; // Assuming you have a way to get the session ID
  userId: number = -1; // Assuming you have a way to get the user ID

  
  constructor(private router: Router, private authService: AuthService,  private route: ActivatedRoute, private painDataService: PainDataService ) {}

  navigateTo( route: string ): void {
    this.router.navigate([ route ]);
  }
  title = 'chartDemo';
  ngOnInit() {

    this.userId = -1;
    this.sessionId = this.authService.getSessionId();
    if (this.sessionId === null) {
      this.router.navigate(['/login']);
    }

    Chart.register(...registerables);

    // Assuming you have a list of pain levels
    const painLevels = [0, 6, 2, 8, 5, 7, 4, 9, 1, 10];

    // Creating the chart
    const myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: painLevels.map((_, index) => `Point ${index + 1}`),
        datasets: [{
          label: 'pain Levels',
          data: painLevels,
          backgroundColor: "#0196FD",
          borderColor: "#0196FD",
          borderWidth: 1,
          tension: 0.3
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
          legend: {
            display: false, // Set this to false to hide the legend
          }
          // datalabels: {
          //   anchor: 'end',
          //   align: 'end',
          //   font: { size: 12 },
          //   formatter: (value: any, context: any) => value
          // }
      }
      }
    });


    const painLocations = [
      { type: 'Type1', count: 15 },
      { type: 'Type2', count: 30 },
      { type: 'Type3', count: 20 },
      // ... other types
    ];

    // Creating the chart
    const myChartPie = new Chart("myChartPie", {
      type: 'pie',
      data: {
        labels: painLocations.map(location => location.type),
        datasets: [{
          label: 'pain Locations',
          data: painLocations.map(location => location.count),
          backgroundColor: ["#F0F9E6", "#FDE9F2", "#FBFBEF", "#5733FF", "#FF3366", "#66FF33", "#FFD700", "#7B68EE", "#00FA9A", "#8A2BE2"],
          borderColor: "#0196FD",
          borderWidth: 0,
          // tension: 0.3
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
          text: 'Pain Locations',
          font: {
            size: 16
          }
          },
          legend: {
            position: 'bottom', // Set this to false to hide the legend
          },
          datalabels: {
            display: 'initial',
            anchor: 'end',
            align: 'start',
            offset: 4,
            color: 'white',
            formatter: (value: any, context: any) => {
              // Display the type label on each pie slice
              return painLocations[context.dataIndex].type;
            },
          },
      }
      }
    });
  }
}
