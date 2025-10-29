import { Component } from '@angular/core';
import {  SurveyService } from 'src/app/service/survey.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  standalone: false
})
export class MainPageComponent {
  constructor(private surveyservice:SurveyService,){}
  survey = this.surveyservice
  data: any[] = [];

  ngOnInit() {
    this.survey.getAll().subscribe( (data) =>
      this.data = data
  )
 }


}


