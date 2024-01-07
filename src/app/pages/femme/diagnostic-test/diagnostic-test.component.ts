import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DiagnosticDataService } from 'src/app/services/api/diagnostic-data.service';

interface Question {
  text: string;
  type: 'range' | 'checkbox' | 'radio';
  choices?: any[];
  values: any[];
}

@Component({
  selector: 'app-diagnostic-test',
  templateUrl: './diagnostic-test.component.html',
  styleUrls: ['./diagnostic-test.component.css']
})
export class DiagnosticTestComponent {

  constructor(
    private router: Router,
    private diagnosticDataService: DiagnosticDataService
    ) {}
  navigateTo( route: string ): void {
    this.router.navigate([ route ]);
  }

  currentQuestionIndex: number = 0;

  questions: Question[] = [
    { text: 'When do you start your period ?',type: 'radio', choices: ['Before 11 years old', 'Above 11 years old'],values: [0,1] },
    { text: 'Your menstrual cycle length average ?', type: 'radio', choices: ['Less than 27 days', 'More than 27 days', 'Not sure'], values: [0,1,2] },
    { text: 'Do you have a familly history of endometriosis ?', type: 'radio', choices: ['Yes', 'No'], values: [0,1] },
    { text: 'Did you give birth ?', type: 'radio', choices: ['Yes', 'No'], values: [0,1] },
    { text: 'Do you have trouble getting pregnant ?', type: 'radio', choices: ['Yes', 'No'], values: [0,1] },
  ];

  selectedChoices: { [key: string]: any } = {};

  userAttemptedToMoveNext: boolean = false;

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      const currentChoices = this.selectedChoices[this.currentQuestionIndex];
      if(currentChoices != -1){
        this.currentQuestionIndex++;
        this.userAttemptedToMoveNext = false;
      }
      else{
        console.log('Please provide a valid answer for the current question.');
        this.userAttemptedToMoveNext = true;
      }
    }
  }

  // Function to move to the previous question
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    } else {
      // If the user is on the first question, perform the cancel action (e.g., redirect to dashboard)
      this.navigateTo('/dashboard');
    }
  }

  submitAnswers() {
    this.navigateTo('/dashboard');
    console.log('Selected Choices:', this.selectedChoices);

    this.diagnosticDataService.submitDiagnosticTest(this.selectedChoices,-1,-1).subscribe(
      (response) => {
        // Handle the response from the backend if needed
        console.log('Backend response:', response);
        // Navigate to the dashboard or another appropriate page
        this.navigateTo('/dashboard');
      },
      (error) => {
        // Handle errors from the backend
        console.error('Error submitting diagnostic test:', error);
      }
    );
  }

  ngOnInit() {

    // Initialize selectedChoices based on questions
    this.questions.forEach((question, index) => {
      this.selectedChoices[index] = -1;
    })
  
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }

  getProgressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.getTotalQuestions()) * 100;
  }
}
