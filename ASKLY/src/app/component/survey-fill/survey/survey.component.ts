import { ResponseService } from './../../../service/response.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from 'src/app/service/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  constructor(private surveyService: SurveyService, private route: ActivatedRoute, private responseService: ResponseService) { }
  survey = this.surveyService.getAll()
  options: any[] = [];
  option: any = {};

  ngOnInit() {
      this.survey.subscribe((data) => {
        this.options = data
        const id = Number(this.route.snapshot.paramMap.get('id')!);
        this.option = data[id];
      })

  }

  res: any = {};
  submitButton(){
    /*return this.responseService.createResponse(res).subscribe({
      next: (res) => {
        alert('Survey Submitted! Thank you for your participation.');
      },
      error: (err) => {
        alert('Survey Submission failed! ' + err.message);
      }
    });*/

  }
}
