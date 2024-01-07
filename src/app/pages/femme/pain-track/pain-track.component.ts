import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Define the Question type
interface Question {
  text: string;
  type: 'range' | 'checkbox';
  choices?: any[];
  displayChoices?: boolean;
  values?: any;
}

@Component({
  selector: 'app-pain-track',
  templateUrl: './pain-track.component.html',
  styleUrls: ['./pain-track.component.css']
})
export class PainTrackComponent {

  constructor(private router: Router) {}
  navigateTo( route: string ): void {
    this.router.navigate([ route ]);
  }

  currentQuestionIndex: number = 0;

  questions: Question[] = [
    { text: 'Pain level?', type: 'range'},
    { text: 'Symptoms', type: 'checkbox', choices: ['Option A', 'Option B', 'Option C'], displayChoices: false, values:[0,1,2] },
    { text: 'What Makes Pain Worse?', type: 'checkbox', choices: ['Choice 1', 'Choice 2', 'Choice 3'], displayChoices: false, values:[0,1,2] },
  ];

  selectedChoices: { [key: string]: any } = {};

  // Function to move to the previous question
  previousQuestion() {
    this.navigateTo('dashboard');
  }

  generateTrackData(selectedChoices: { [key: string]: any }): any {
    const trackData: any = {};

    trackData[0] = selectedChoices[0];
  
    Object.keys(this.selectedChoices).forEach((keyG,i) => {
      if(keyG=='0'){
        trackData[0] = selectedChoices[0];
      }
      else{
        let answer:string="";
        const selectedChoicesForOne = this.selectedChoices[keyG];
        Object.keys(selectedChoicesForOne).forEach((key,j) => {
          const value = selectedChoicesForOne[key];
          if(value){
            if(answer==""){
              answer+=`${this.questions[i].values[j]}`;
            }else{
              answer+=`,${this.questions[i].values[j]}`;
            }
            // console.log(answer);
          }
          // console.log(value);
        });
        trackData[keyG] = answer;
      }
    });
    return trackData;
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

  toggleChoices(question: any): void {
    question.displayChoices = !question.displayChoices;
  }


  getColorForPainLevel(painLevel: number): string {
    // Define color gradient based on pain levels
    const gradient = [
      { value: 1, color: '#5643DC' }, // Green
      { value: 4, color: '#B8E3DD' }, // Yellow
      { value: 6, color: '#E0BF68' }, // Orange
      { value: 8, color: '#EEB07A' }, // Red-Orange
      { value: 10, color: '#EE4743' } // Red
    ];

    // Find the appropriate color based on the pain level
  const color = gradient.find(item => painLevel <= item.value)?.color || '#000000';

  return color;
}

getPainDescription(painLevel: number): string {
  // Define pain descriptions based on pain levels
  if (painLevel < 1) {
    return 'None';
  } else if (painLevel < 4) {
    return 'Mild';
  } else if (painLevel < 6) {
    return 'Moderate';
  } else if (painLevel < 8) {
    return 'Severe';
  } else if (painLevel < 10) {
    return 'Very Severe';
  } else {
    return 'Worst pain possible';
  }
}


submitAnswers() {
  const trackData = this.generateTrackData(this.selectedChoices);
  console.log('Track Data:', trackData);

  this.navigateTo('dashboard');
}

}
