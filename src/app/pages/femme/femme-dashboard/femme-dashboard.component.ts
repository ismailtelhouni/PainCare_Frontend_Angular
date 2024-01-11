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
  Feelings: any[] = [];
  PainWorses: any[] = [];
  
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
  userName = '';
  userProfil = '';
  title = 'chartDemo';



  ngOnInit() {

    console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", localStorage.getItem("userIdSession"));
    this.userId = this.authService.getUserId();
    this.sessionId = this.authService.getSessionId();
    this.femmeId = this.authService.getFemmeId();

    console.log("token", this.sessionId)
    console.log("femmmmmmmmmmmmmmmmmmme id ; ", this.femmeId);
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
        console.log("good", response);
        this.painLocations = response.map((item) => parseInt(item.painLevel));
        this.updateChartTitle(this.painLevels);

        // this.femmeId = response[0]?.femme?.femmeId;
        // localStorage.setItem("femmeId",JSON.stringify(this.femmeId));
        // console.log("femmeeeeeeeeeeeeeeee",this.femmeId);
//---------------------------------------------------------------------------------------------------------
        // Assuming your response is stored in the variable 'response'
        const painLocationsArray = response.filter(item => item.painLocations.trim() !== '')  // Filter out items with empty painLocations
                                          .map((item) => item.painLocations.split(',').map(Number)).flat();

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

//---------------------------------------------------------------------------------------------------------
        // Assuming your response is stored in the variable 'response'
        const painSymptomsArray = response.filter(item => item.symptoms.trim() !== '')
                                          .map((item) => item.symptoms.split(',').map(Number)).flat();

        // Mapping of pain location types
        const SymptomsTypes = ['Cramps', 'Headache', 'Acne', 'Fatigue', 'Bloating', 'Craving'];

        // Count the occurrences of each pain location
        const countBySymptoms = painSymptomsArray.reduce((acc, value) => {
          const type = SymptomsTypes[value];
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});

        // Convert the countByPainLocation object into an array
        this.Symptoms = Object.entries(countBySymptoms).map(([type, count]) => ({ type, count }));

        this.updateChartTitleSymptoms(this.Symptoms);

//---------------------------------------------------------------------------------------------------------
        // Assuming your response is stored in the variable 'response'
        const PainWorsesArray = response.filter(item => item.painWorse.trim() !== '')
                                          .map((item) => item.painWorse.split(',').map(Number)).flat();

        // Mapping of pain location types
        const PainWorsesTypes = ['Lack of sleep', 'Sitting', 'Standing','Stress','Walking','Exercise','Urination'];

        // Count the occurrences of each pain location
        const countByPainWorses = PainWorsesArray.reduce((acc, value) => {
          const type = PainWorsesTypes[value];
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});

        // Convert the countByPainLocation object into an array
        this.PainWorses = Object.entries(countByPainWorses).map(([type, count]) => ({ type, count }));

        this.updateChartTitlePainWorses(this.PainWorses);

//---------------------------------------------------------------------------------------------------------
        // Assuming your response is stored in the variable 'response'
        const painFeelingsArray = response.filter(item => item.fellings.trim() !== '')
                                          .map((item) => item.fellings.split(',').map(Number)).flat();

        // Mapping of pain location types
        const FeelingsTypes = ['Anxious', 'Depressed', 'Dizzy','Vomiting','Diarrhea'];

        // Count the occurrences of each pain location
        const countByFeelings = painFeelingsArray.reduce((acc, value) => {
          const type = FeelingsTypes[value];
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});

        // Convert the countByPainLocation object into an array
        this.Feelings = Object.entries(countByFeelings).map(([type, count]) => ({ type, count }));

        this.updateChartTitleFeeling(this.Feelings);

      },
      (error) => {
        console.error('Error fetching pain levels:', error);
      }
    );

    Chart.register(...registerables);
    this.updateChartTitle(this.painLevels);
    this.updateChartTitleLocations(this.painLocations);
    this.updateChartTitleSymptoms(this.Symptoms);
    this.updateChartTitlePainWorses(this.PainWorses);
    this.updateChartTitleFeeling(this.Feelings);


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
      this.updateChartTitlePainWorses(this.PainWorses);
      this.updateChartTitleFeeling(this.Feelings);
    });


    // const femmeIdString = localStorage.getItem("femmeId");
    // const femmeId = femmeIdString ? parseInt(femmeIdString) : null;

    // const u = this.userId==null?null:this.userId-1;
    // this.femmeId=u;


    this.userDataService.getFemmeById(this.femmeId).subscribe(
      (response) => {
        console.log("femeeeNaaaaaaaaaaaaaaaaaaammmmmmmmmmmeeeeeeeeeee", response)
        this.userSurname = response.prenom;
        this.userName = response.nom;
        this.userProfil = response.profil;
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

    console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", Symptoms);
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
          backgroundColor: ['#e74c3c', "#FF3366", "#66FF33", "#FFD700", '#d98880',
          '#95a5a6', '#dcdde1', '#34495e', '#bdc3c7', '#7f8c8d'],
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



  updateChartTitleFeeling(Feelings: any): void {

    console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", Feelings);
    const existingChart = Chart.getChart("myChartPieFeelings");
    // this.destroyChart(existingChart);
    if (existingChart) {
      existingChart.destroy(); // Destroy the existing chart
    }
    const chart = new Chart("myChartPieFeelings", {
      type: 'pie',
      data: {
        labels: Feelings.map((Feeling: any) => Feeling.type),
        datasets: [{
          label: 'Feelings',
          data: Feelings.map((Feeling: any) => Feeling.count),
          backgroundColor: ['#9b59b6', '#aec7e8', '#3498db', "#66FF33", '#FFD700',
          '#e67e22', '#f5cba7', '#d35400', '#f39c12', '#e74c3c'],
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
            text: this.translateService.instant('Feeling'),
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
              return Feelings[context.dataIndex].type;
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



  updateChartTitlePainWorses(PainWorses: any): void {

    console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", PainWorses);
    const existingChart = Chart.getChart("myChartPiePainWorses");
    // this.destroyChart(existingChart);
    if (existingChart) {
      existingChart.destroy(); // Destroy the existing chart
    }
    const chart = new Chart("myChartPiePainWorses", {
      type: 'pie',
      data: {
        labels: PainWorses.map((PainWorse: any) => PainWorse.type),
        datasets: [{
          label: 'PainWorses',
          data: PainWorses.map((PainWorse: any) => PainWorse.count),
          backgroundColor: ['#1f77b4','#d2b4de', "#FF3366", '#85c1e9','#2980b9',
          '#2ecc71', '#a9dfbf', "#FF3366", "#66FF33", "#FFD700"],
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
            text: this.translateService.instant('PainWorses'),
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
              return PainWorses[context.dataIndex].type;
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
