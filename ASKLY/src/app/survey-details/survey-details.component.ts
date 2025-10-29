import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../service/survey.service';
import { Observable, throwError } from 'rxjs';
import { ResultsService } from '../service/results.service';
import { surveyResults } from '../models/surveyResults';
import { results } from '../models/result';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {

  constructor(
    private resultsService: ResultsService,
    private readonly route: ActivatedRoute
  ){}
  results: results[] = [];

  ngOnInit(): void {
    const surveyIdParam = this.route.snapshot.paramMap.get('id');
    const survey_id = surveyIdParam ? Number(surveyIdParam) : null;
    if (survey_id !== null && !Number.isNaN(survey_id)) {
      this.getSurveyDetails(survey_id);
    } else {
      console.error('Invalid survey id');
    }
  }

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
