import { choice } from './../models/choice';
import { question } from './../models/question';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError, throwIfEmpty } from 'rxjs';
import { SurveyService } from './survey.service';
import { survey } from '../models/survey';
import { ReturnStatement } from '@angular/compiler';
import { ResponseService } from './response.service';
import { surveyResults } from '../models/surveyResults';
import { response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private readonly url = '/api/results';
  foundClosedSurveys: survey[] = [];
  constructor(
    private readonly http: HttpClient,
    private readonly surveyService: SurveyService,
    private readonly responseService: ResponseService
  ){}

  //GET ALL CLOSED SURVEYS
  getAllSurveys(): Observable<survey[]>{
    return this.surveyService.getAll().pipe(
      //@ts-ignore
      map((closedSurveys: survey[]) => {
        closedSurveys.find((cS) => {
          if(!cS.isOpen)
            this.foundClosedSurveys.push(cS);
        });
        return this.foundClosedSurveys;
      })
    )
  }
  getResults(surveyID: number): Observable<any>{
    return this.surveyService.getAll().pipe(
      //@ts-ignore
      map((closedSurvey: survey[]) => {
        const cSurvey = closedSurvey.find((cS) => cS.id === surveyID) ?? null;
        if(!cSurvey)
          throw new Error('Survey does not exist');

        return cSurvey;
      }),
      switchMap((survey: survey) =>
        this.responseService.getBySurveyId(survey.id).pipe(
          //@ts-ignore
          map((responses: response[]) => ({survey, responses}))
        )
      ),
      //@ts-ignore
      map(({survey, responses}) =>  this.aggregateResults(survey, responses)),
      catchError(err => throwError(() => err))
    );
  }
  private aggregateResults(survey: survey, responses: response[]): surveyResults {
    // Build a map: questionId → { questionText, answerMap }
    const questionMap = new Map<
      number,
      { text: string; answers: Map<number, { text: string; count: number }> }
    >();

    // Initialise every question
    for (const q of survey.questions) {
      const answerMap = new Map<number, { text: string; count: number }>();
      for (const c of q.choices) {
        answerMap.set(c.id, { text: c.text, count: 0 });
      }
      questionMap.set(q.id, { text: q.text, answers: answerMap });
    }

    // Count every submitted answer
    for (const resp of responses) {
      for (const a of resp.answers) {
        const qData = questionMap.get(a.questionId);
        if (!qData) continue;                 // safety – should never happen
        const choiceData = qData.answers.get(a.choiceId);
        if (choiceData) choiceData.count++;
      }
    }

    // Transform to the final `results` shape
    return Array.from(questionMap.entries()).map(([qId, qData]) => ({
      questionID: qId,
      questionText: qData.text,
      answers: Array.from(qData.answers.entries())
        .map(([aId, aData]) => ({
          answerID: aId,
          answerText: aData.text,
          count: aData.count
        }))
        .filter(a => a.count > 0)   // optional: hide zero-count answers
    }));
  }

}
