import { Component } from '@angular/core';

// Define the Question type
interface Question {
  text: string;
  type: 'range' | 'checkbox';
  choices?: any[];
}

@Component({
  selector: 'app-pain-track',
  templateUrl: './pain-track.component.html',
  styleUrls: ['./pain-track.component.css']
})
export class PainTrackComponent {
  currentQuestionIndex: number = 0;

  questions: Question[] = [
    { text: 'How would you rate your pain level?', type: 'range' },
    { text: 'Choose your answer:', type: 'checkbox', choices: ['Option A', 'Option B', 'Option C'] },
    { text: 'Choose your answer:', type: 'checkbox', choices: ['Choice 1', 'Choice 2', 'Choice 3'] },
  ];

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
      console.log('Selected Choices:', this.selectedChoices);
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
  }
}
