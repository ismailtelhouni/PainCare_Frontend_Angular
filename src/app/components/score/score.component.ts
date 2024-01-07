import { Component } from '@angular/core';
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
    private scoreDataService: ScoreDataService
    ) {}

  ngOnInit() {
    this.fetchScoreValue();
  }

  fetchScoreValue() {
    this.scoreDataService.getScoreValue(this.userId).subscribe(
      (value: number) => {
        this.scoreValue = value;
        this.calculateScore();
      },
      error => {
        console.error('Error fetching score value', error);
      }
    );
  }

  calculateScore() {
    if (this.scoreValue < 4) {
      this.score = 'Low';
    } else if (this.scoreValue < 7) {
      this.score = 'Medium';
    } else {
      this.score = 'High';
    }
  }

}
