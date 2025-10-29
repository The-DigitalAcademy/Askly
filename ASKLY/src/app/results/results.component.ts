import { Component } from '@angular/core';
import { SurveyService } from '../service/survey.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  standalone: false
})
export class ResultsComponent {
  constructor(private surveyService: SurveyService) {}
    survey = this.surveyService.getAll()
    data: any[] = [];

    ngOnInit() {
      this.survey.subscribe((data) =>
        this.data = data
    )
    }
}
