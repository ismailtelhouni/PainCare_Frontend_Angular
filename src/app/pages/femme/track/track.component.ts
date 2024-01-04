import { Component, OnInit } from '@angular/core';


// Define the Question type
interface Question {
  text: string;
  type: 'range' | 'checkbox';
  choices?: any[];
}

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})

export class TrackComponent implements OnInit{

  currentQuestionIndex: number = 0;

  questions: Question[] = [
    { text: 'How would you rate your pain level?', type: 'range' },
    { text: 'Choose your answer:', type: 'checkbox', choices: ['Option A', 'Option B', 'Option C'] },
    { text: 'Choose your answer:', type: 'checkbox', choices: ['Choice 1', 'Choice 2', 'Choice 3'] },
  ];

  // painLevel: number = 0;
  // question2Choices: string[] = ['Option A', 'Option B', 'Option C'];
  // question3Choices: string[] = ['Choice 1', 'Choice 2', 'Choice 3'];
  // selectedChoices: any = {painLevel: 0, question2: {},question3: {}};
  // progress: number = 0;

  selectedChoices: { [key: string]: any } = {};

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestionIndex++;
    }
  }

  // Function to move to the previous question
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitAnswers() {
    // Implement your logic to submit the questionnaire
      console.log('Selected Choices:', this.selectedChoices);
      // painLevel: this.painLevel,
      // question2: this.selectedChoices.question2,
      // question3: this.selectedChoices.question3,
    // });
  }

  ngOnInit() {

    // Initialize selectedChoices based on questions
    this.questions.forEach((question, index) => {
      this.selectedChoices[index] = {};
      if (question.type === 'checkbox' && question.choices) {
        question.choices.forEach(choice => {
          this.selectedChoices[index][choice] = false;
        });
      }else{
        this.selectedChoices[index] = 0;
      }
    });

    // Initialize question2 choices to false
    // this.question2Choices.forEach(choice => {
    //   this.selectedChoices.question2[choice] = false;
    // });
  
    // Initialize question3 choices to false
    // this.question3Choices.forEach(choice => {
    //   this.selectedChoices.question3[choice] = false;
    // });
  }
}
