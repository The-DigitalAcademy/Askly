import { Component } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {

  surveyQuestions =  [
    {
      id: 1,
      text: 'Survey One',
      choices: [{
        id: 1,
        text: 'Option 1'
      },
      {
        id: 2,
        text: 'Option 2'
      },
      {
        id: 3,
        text: 'Option 3'
      }]
    },
    {
      id: 1,
      text: 'Survey Two',
      choices: [{
        id: 1,
        text: 'Option 1'
      },
      {
        id: 2,
        text: 'Option 2'
      },
      {
        id: 3,
        text: 'Option 3'
      }]
    },
    {
      id: 1,
      text: 'Survey Three',
      choices: [{
        id: 1,
        text: 'Option 1'
      },
      {
        id: 2,
        text: 'Option 2'
      },
      {
        id: 3,
        text: 'Option 3'
      }]
    }
  ];

  onCheckedboxChange(selectedItem: any, selectedIndex: number){
    this.surveyQuestions.forEach((item, index) =>{
      if (index !== selectedIndex){
        
      }
    })
  }
  cancelButton(): void{

  }

  submitButton(): void{

  }
}
