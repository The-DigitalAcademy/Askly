import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { throwError } from 'rxjs';
import { user} from 'src/app/models/user';
import { SurveyService } from '../service/survey.service';
import { survey } from '../models/survey';
import { question } from '../models/question';

@Component({
  selector: 'app-create-survey-compound',
  templateUrl: './create-survey-compound.component.html',
  styleUrls: ['./create-survey-compound.component.css']
})
export class CreateSurveyCompoundComponent {
  title = '';
  desc = '';
  questions: question[] = [];
  newQuestionText = '';
  newChoiceText = '';
  newChoices: string[] = [];
  survey!: survey;

  constructor(private surveyService: SurveyService) {}

  addQuestion() {
    console.log(this.newChoices)
    const validOptions= this.newChoices.filter(opt => opt.trim() !='')
    if (this.newQuestionText && validOptions.length > 0) {
      console.log(this.newQuestionText);
      console.log(validOptions.length)
      const question: question = {
        text: this.newQuestionText,
        choices: validOptions.map((Opt, i) => ({
          id: i + 1,
          text: Opt,
        })),
        id: 0
      }
      this.questions.push(question);
      console.log(this.questions);
      this.newQuestionText = '';
      this.newChoices = ['','','',''];
    }
  }
  addOption(){
    this.newChoices.push(this.newChoiceText);
    console.log(this.newChoiceText);
    this.newChoiceText = '';
  }
  submit(){
    this.survey = {
      id: 0,
      title: this.title,
      desc: this.desc,
      questions: this.questions,
      isOpen: false,
      createdAt: new Date().toISOString()
    }
    console.log(this.survey);

    this.surveyService.createSurvey(this.survey);
  }
}
