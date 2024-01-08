import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import { UserDataService } from 'src/app/services/api/user-data.service';
import { PainDataService } from 'src/app/services/apis/pain-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-femme-dashboard',
  templateUrl: './femme-dashboard.component.html',
  styleUrls: ['./femme-dashboard.component.css']
})
export class FemmeDashboardComponent {

  sessionId: number | null = null; // Assuming you have a way to get the session ID
  userId: number | null = null; // Assuming you have a way to get the user ID
  femmeId: number | null = null;
  painLevels: number[] = [];
  painLocations: any[] = [];
  Symptoms: any[] = [];
  painLevelsAvg = 0;


  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private painDataService: PainDataService,
    private translateService: TranslateService,
    private userDataService: UserDataService,
    private cdr: ChangeDetectorRef
  ) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  userSurname = '';
  userName='';
  title = 'chartDemo';



  ngOnInit() {

    console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",localStorage.getItem("userIdSession"));
    this.userId = this.authService.getUserId();
    this.sessionId = this.authService.getSessionId();
    this.femmeId = this.authService.getFemmeId();

    console.log("token",this.sessionId)
    console.log("femmmmmmmmmmmmmmmmmmme id ; ",this.femmeId);
    if (this.sessionId === null) {
      this.router.navigate(['/login']);
    }

    // Fetch pain levels from the backend
    this.painDataService.getPainLevelData(this.sessionId, this.userId).subscribe(
      (response) => {
        this.painLevels = response.map((item) => parseInt(item.painLevel)).reverse();
        if (this.painLevels.length > 0) {
          const sum = this.painLevels.reduce((acc, value) => acc + value, 0);
          this.painLevelsAvg = sum / this.painLevels.length;
        } else {
          // Handle the case when the array is empty to avoid division by zero
          this.painLevelsAvg = 0;
        }
        console.log("good",response);
        this.painLocations = response.map((item) => parseInt(item.painLevel));
        this.updateChartTitle(this.painLevels);

        // this.femmeId = response[0]?.femme?.femmeId;
        // localStorage.setItem("femmeId",JSON.stringify(this.femmeId));
        // console.log("femmeeeeeeeeeeeeeeee",this.femmeId);

        // Assuming your response is stored in the variable 'response'
        const painLocationsArray = response.map((item) => item.painLocations.split(',').map(Number)).flat();

        // Mapping of pain location types
        const locationTypes = ['Abdomen', 'Back', 'Chest', 'Head', 'Neck', 'Hips'];

        // Count the occurrences of each pain location
        const countByPainLocation = painLocationsArray.reduce((acc, value) => {
          const type = locationTypes[value];
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});

        // Convert the countByPainLocation object into an array
        this.painLocations = Object.entries(countByPainLocation).map(([type, count]) => ({ type, count }));

        this.updateChartTitleLocations(this.painLocations);


        // Assuming your response is stored in the variable 'response'
        const painSymptomsArray = response.map((item) => item.symptoms.split(',').map(Number)).flat(); 

        // Mapping of pain location types
        const SymptomsTypes = ['Cramps', 'Headache', 'Acne','Fatigue','Bloating','Craving'];

        // Count the occurrences of each pain location
        const countBySymptoms = painSymptomsArray.reduce((acc, value) => {
          const type = SymptomsTypes[value];
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});

        // Convert the countByPainLocation object into an array
        this.Symptoms = Object.entries(countBySymptoms).map(([type, count]) => ({ type, count }));

        this.updateChartTitleSymptoms(this.Symptoms);
      },
      (error) => {
        console.error('Error fetching pain levels:', error);
      }
    );

    Chart.register(...registerables);
    this.updateChartTitle(this.painLevels);
    this.updateChartTitleLocations(this.painLocations);


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
      this.updateChartTitle(this.painLevels); 
      this.updateChartTitleLocations(this.painLocations);
      this.updateChartTitleSymptoms(this.Symptoms);
    });


    // const femmeIdString = localStorage.getItem("femmeId");
    // const femmeId = femmeIdString ? parseInt(femmeIdString) : null;

    // const u = this.userId==null?null:this.userId-1;
    // this.femmeId=u;


    this.userDataService.getFemmeById(this.femmeId).subscribe(
      (response) => {
        console.log("femeeeNaaaaaaaaaaaaaaaaaaammmmmmmmmmmeeeeeeeeeee",response)
        this.userSurname = response.prenom;
        this.userName = response.nom;
      },
      (error) => {
        console.error('Error fetching pain levels:', error);
      }
    );
    console.log()
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
        labels: painLevels.map((_: any, index: any) => `Point ${index + 1}`),
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
            max: 11  // Set the maximum value of the y-axis to 10
          }
        },
        plugins: {
          title: {
            display: true,
            text: `${this.translateService.instant('chartTitle')} ( ${this.translateService.instant('AVG')} ${this.painLevelsAvg} )`,
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
        labels: painLocations.map((location: any) => location.type),
        datasets: [{
          label: 'pain Locations',
          data: painLocations.map((location: any) => location.count),
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





  updateChartTitleSymptoms(Symptoms: any): void {

    console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",Symptoms);
    const existingChart = Chart.getChart("myChartPieSymptoms");
    // this.destroyChart(existingChart);
    if (existingChart) {
      existingChart.destroy(); // Destroy the existing chart
    }
    const chart = new Chart("myChartPieSymptoms", {
      type: 'pie',
      data: {
        labels: Symptoms.map((symptom: any) => symptom.type),
        datasets: [{
          label: 'Symptoms',
          data: Symptoms.map((symptom: any) => symptom.count),
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
            text: this.translateService.instant('Symptoms'),
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
              return Symptoms[context.dataIndex].type;
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
