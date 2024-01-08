import { ChangeDetectorRef, Component } from '@angular/core';
import { DiagnosticDataService } from 'src/app/services/api/diagnostic-data.service';
import { ScoreDataService } from 'src/app/services/api/score-data.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  score: string = 'Low';
  scoreValue: number = 0;
  userId: string = '1';

  constructor(
    private diagnosticDataService: DiagnosticDataService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.fetchScoreValue();
  }

  fetchScoreValue() {
    const femmeIdString = localStorage.getItem("femmeId");
    const femmeId = femmeIdString ? parseInt(femmeIdString) : null;

    this.diagnosticDataService.getLastDiagnosticTest(femmeId).subscribe(
      (response) => {
        this.scoreValue = response;
        console.log("scoreeeeeeeeeeeeeeeeee: ",response[0].reponse);
        // this.calculateScore();
        // Split the text into an array of strings
        const valuesAsString = response[0].reponse.split(',');

        // Convert the array of strings to an array of numbers
        const valuesAsNumbers = valuesAsString.map(Number);

        // Use the reduce function to calculate the sum
        const sum = valuesAsNumbers.reduce((acc:any, currentValue:any) => acc + currentValue, 0);

        console.log('Sum:', sum);
        this.scoreValue = sum;
        this.calculateScore();
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error fetching score value', error);
      }
    );
  }

  calculateScore() {
    if (this.scoreValue <= 4) {
      this.score = 'Low';
    } else if (this.scoreValue <= 8) {
      this.score = 'Medium';
    } else {
      this.score = 'High';
    }
  }

}
