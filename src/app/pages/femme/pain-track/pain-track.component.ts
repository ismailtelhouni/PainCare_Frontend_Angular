import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PainTrackDataService } from 'src/app/services/api/pain-track-data.service';

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

  constructor(
    private router: Router,
    private painTrackDataService: PainTrackDataService
    ) {}
  navigateTo( route: string ): void {
    this.router.navigate([ route ]);
  }

  currentQuestionIndex: number = 0;

  questions: Question[] = [
    { text: 'Pain level?', type: 'range'},
    { text: 'Pain Locations', type: 'checkbox', choices: ['Abdomen', 'Back', 'Chest', 'Head', 'Neck', 'Hips'], displayChoices: false, values:[0,1,2,3,4,5] },
    { text: 'Symptoms', type: 'checkbox', choices: ['Cramps', 'Headache', 'Acne','Fatigue','Bloating','Craving'], displayChoices: false, values:[0,1,2,3,4,5] },
    { text: 'What Makes Pain Worse?', type: 'checkbox', choices: ['Lack of sleep', 'Sitting', 'Standing','Stress','Walking','Exercise','Urination'], displayChoices: false, values:[0,1,2,3,4,5,6] },
    { text: 'Feeling', type: 'checkbox', choices: ['Anxious', 'Depressed', 'Dizzy','Vomiting','Diarrhea'], displayChoices: false, values:[0,1,2,3,4] },
  ];

  selectedChoices: { [key: string]: any } = {};

  // Function to move to the previous question
  previousQuestion() {
    this.navigateTo('dashboard');
  }

  generateTrackData(selectedChoices: { [key: string]: any }): any {
    const trackData: any = {};
  
    Object.keys(this.selectedChoices).forEach((keyG,i) => {
      if(keyG=='0'){
        trackData["painLevel"] = selectedChoices[0];
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
        if(keyG=='1')
        trackData['painLocations'] = answer;
        if(keyG=='2')
        trackData['symptoms'] = answer;
        if(keyG=='3')
        trackData['painWorse'] = answer;
        if(keyG=='4')
        trackData['fellings'] = answer;  
      }
    });

    const femmeIdString = localStorage.getItem("femmeId");
    const femmeId = femmeIdString ? parseInt(femmeIdString) : null;

    trackData['femme'] = {
      'femmeId': femmeId
    };
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

  const sessionId = 1; // Replace with your actual session ID
  const userId = 1; // Replace with your actual user ID

  // Call the service to send track data to the backend
  this.painTrackDataService.sendTrackData(trackData, sessionId, userId).subscribe(
      response => {
        // Handle success, e.g., navigate to another page
        this.navigateTo('dashboard');
      },
      error => {
        // Handle error
        console.error('Error sending track data:', error);
      }
  );

  this.navigateTo('dashboard');
  }

}
