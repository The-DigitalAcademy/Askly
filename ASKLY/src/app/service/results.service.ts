import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SurveyService } from './survey.service';
import { ResponseService } from './response.service';
import { survey } from '../models/survey';
import { response } from '../models/response';
import { surveyResults } from '../models/surveyResults';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private readonly url = '/api/results';

  constructor(
    private readonly http: HttpClient,
    private readonly surveyService: SurveyService,
    private readonly responseService: ResponseService
  ) {}

  /**
   * Get all CLOSED surveys
   */
  getAllSurveys(): Observable<survey[]> {
    return this.surveyService.getAll().pipe(
      map((surveys: survey[]) => surveys.filter(s => !s.isOpen))
    );
  }

  /**
   * Get results for a specific survey by ID
   */
  getResults(surveyID: number): Observable<{ results: surveyResults; respondentCount: number }> {
    return this.surveyService.getById(surveyID).pipe(
      switchMap((survey: survey | undefined) => {
        if (!survey) {
          return throwError(() => new Error('Survey does not exist'));
        }

        // Optional: enforce closed survey
        // if (survey.isOpen) {
        //   return throwError(() => new Error('Results are only available for closed surveys'));
        // }

        return this.responseService.getBySurveyId(survey.id).pipe(
          map((responses: response[]) => {
            const uniqueRespondents = new Set(responses.map(r => r.userId)).size;
            return {
              survey,
              responses,
              respondentCount: uniqueRespondents
            };
          })
        );
      }),
      map(({ survey, responses, respondentCount }) => ({
        results: this.aggregateResults(survey, responses),
        respondentCount
      })),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Aggregate responses into structured results
   */
  private aggregateResults(survey: survey, responses: response[]): surveyResults {
    // Initialize map: questionId → { text, answers: choiceId → { text, count } }
    const questionMap = new Map<
      number,
      { text: string; answers: Map<number, { text: string; count: number }> }
    >();

    // Step 1: Initialize all questions and choices with count = 0
    for (const question of survey.questions) {
      const answerMap = new Map<number, { text: string; count: number }>();
      for (const choice of question.choices) {
        answerMap.set(choice.id, { text: choice.text, count: 0 });
      }
      questionMap.set(question.id, { text: question.text, answers: answerMap });
    }

    // Step 2: Count responses
    for (const resp of responses) {
      for (const answer of resp.answers) {
        const qData = questionMap.get(answer.questionId);
        if (!qData) continue;

        const choiceData = qData.answers.get(answer.choiceId);
        if (choiceData) {
          choiceData.count++;
        }
      }
    }

    // Step 3: Convert to final surveyResults format
    return Array.from(questionMap.entries()).map(([questionID, qData]) => ({
      questionID,
      questionText: qData.text,
      answers: Array.from(qData.answers.entries()).map(([answerID, aData]) => ({
        answerID,
        answerText: aData.text,
        count: aData.count
      }))
    }));
  }
}