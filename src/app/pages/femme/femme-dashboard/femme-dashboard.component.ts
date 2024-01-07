import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  painLevels: number[] = [];
  painLocations: any[] = [];

  
  constructor(
    private router: Router, 
    private authService: AuthService,  
    private route: ActivatedRoute, 
    private painDataService: PainDataService, 
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef 
    ) {}

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
      const painLevels = [0, 6, 2, 8, 5, 7, 4, 9, 1, 10];
      const painLocations = [
        { type: 'Type1', count: 15 },
        { type: 'Type2', count: 30 },
        { type: 'Type3', count: 20 },
        // ... other types
      ];
      this.updateChartTitle(painLevels);
      this.updateChartTitleLocations(painLocations);


    //   // Fetch pain levels from the backend
    //   this.painDataService.getPainLevelData(this.sessionId, this.userId).subscribe(
    //   (painLevels) => {
    //     this.painLevels = painLevels;
    //     this.updateChartTitle(painLevels);
    //   },
    //   (error) => {
    //     console.error('Error fetching pain levels:', error);
    //   }
    // );

    // // Fetch pain locations from the backend
    // this.painDataService.getPainLocationsData(this.sessionId, this.userId).subscribe(
    //   (painLocations) => {
    //     this.painLocations = painLocations;
    //     this.updateChartTitleLocations(painLocations);
    //   },
    //   (error) => {
    //     console.error('Error fetching pain locations:', error);
    //   }
    // );

    this.translateService.onLangChange.subscribe(() => {
      console.log('Language changed');
      const painLevels = [0, 6, 2, 8, 5, 7, 4, 9, 1, 10];
      this.updateChartTitle(painLevels);

      const painLocations = [
        { type: 'Type1', count: 15 },
        { type: 'Type2', count: 30 },
        { type: 'Type3', count: 20 },
        // ... other types
      ];
      this.updateChartTitleLocations(painLocations);
    });
  }











  updateChartTitle(painLevels: any): void {
    const existingChart = Chart.getChart("myChart");
    // this.destroyChart(existingChart);
    if (existingChart) {
      existingChart.destroy(); // Destroy the existing chart
    }
    const chart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: painLevels.map((_:any, index:any) => `Point ${index + 1}`),
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
          text: this.translateService.instant('chartTitle'),
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

    const translatedTitle = this.translateService.instant('chartTitle');
    console.log('Translated Title:', translatedTitle);
    // chart.options.plugins.title.text = translatedTitle;
    chart.update();

    // Manually trigger change detection
    this.cdr.detectChanges();
  }

  updateChartTitleLocations(painLocations: any): void {
    const existingChart = Chart.getChart("myChartPie");
    // this.destroyChart(existingChart);
    if (existingChart) {
      existingChart.destroy(); // Destroy the existing chart
    }
    const chart = new Chart("myChartPie", {
      type: 'pie',
      data: {
        labels: painLocations.map((location:any) => location.type),
        datasets: [{
          label: 'pain Locations',
          data: painLocations.map((location:any) => location.count),
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
          text: this.translateService.instant('Pain Locations'),
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

    const translatedTitle = this.translateService.instant('chartTitle');
    console.log('Translated Title:', translatedTitle);
    // chart.options.plugins.title.text = translatedTitle;
    chart.update();

    // Manually trigger change detection
    this.cdr.detectChanges();
  }
}
