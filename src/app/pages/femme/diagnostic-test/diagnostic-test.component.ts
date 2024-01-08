import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DiagnosticDataService } from 'src/app/services/api/diagnostic-data.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private diagnosticDataService: DiagnosticDataService,
    private authService: AuthService
    ) {}
  navigateTo( route: string ): void {
    this.router.navigate([ route ]);
  }

  currentQuestionIndex: number = 0;

  questions: Question[] = [
    { text: 'When do you start your period ?',type: 'radio', choices: ['Before 11 years old', 'Above 11 years old'],values: [1,0] },
    { text: 'Your menstrual cycle length average ?', type: 'radio', choices: ['Less than 27 days', 'More than 27 days', 'Not sure'], values: [0,1,0.5] },
    { text: 'Do you have a familly history of endometriosis ?', type: 'radio', choices: ['Yes', 'No'], values: [0.5,0] },
    { text: 'Did you give birth ?', type: 'radio', choices: ['Yes', 'No'], values: [1,0] },
    { text: 'Do you have trouble getting pregnant ?', type: 'radio', choices: ['Yes', 'No'], values: [1,0] },
    { text: 'What is your abdominal/pelvic pain intensity ?', type: 'radio', choices: ['0-2', '3-5','6-8','9-10'], values: [0,1,2,3] },
    { text: 'Severity of pain during intercourse ?', type: 'radio', choices: ['0-2', '3-5','6-8','9-10'], values: [0,1,2,3] },
    { text: 'Duration of period ?', type: 'radio', choices: ['1-7 days','more than 7 days'], values: [0,3] },
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

    // Transform selectedChoices into the desired format
    const formattedResponse = Object.values(this.selectedChoices).join(',');

    // Create the data object to send to the backend

    const femmeId = this.authService.getFemmeId();
    

    const data = {
      reponse: formattedResponse,
      femme: {
        femmeId: femmeId // Replace with the actual femmeId
      }
    };

    // Log the formatted data
    console.log('Formatted Data:', data);

    this.diagnosticDataService.submitDiagnosticTest(data,1,1).subscribe(
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
