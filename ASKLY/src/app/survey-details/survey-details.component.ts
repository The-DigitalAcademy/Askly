import { Component } from '@angular/core';
import { SurveyService } from '../service/survey.service';
import { Observable, throwError } from 'rxjs';
import { ResultsService } from '../service/results.service';
import { surveyResults } from '../models/surveyResults';
import { results } from '../models/result';

@Component({
  selector: 'survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent {

  constructor(private resultsService: ResultsService){}
  results: results[] = [];

  getSurveyDetails(id: number) {
    this.resultsService.getResults(id).subscribe({
      next: (results) => {
        console.log(results);
        this.results = results;
        return results;
      },
      error: (err) => {
        throwError(() => new Error('No survey'))
      }
    })
  }
}
