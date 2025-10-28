import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SurveyService } from './survey.service';
import { Observable, switchMap, throwError } from 'rxjs';
import { response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private readonly url = '/api/response'

  constructor(
    private readonly http: HttpClient,
    private readonly surveyService: SurveyService
  ) { }

  submitSurvey(surveyID: number, answers: any[]): Observable<response>{
    return this.surveyService.getAll().pipe(
      //find the survey first
      //@ts-ignore
      switchMap(allSurveys => {
        const currentSurvey = allSurveys.find(s => s.id === surveyID);
        if(!currentSurvey?.isOpen)
          return throwError(() => new Error('Survey not available'));

        //do we have same number of answers?
      if(answers.length !== currentSurvey.questions.length)
        return throwError(() => new Error('Not all questions answered'));

      for(const ans of answers){
        const q = currentSurvey.questions.find(q => q.id === ans.questionId);
        if(!q?.choices.some(c => c.id === ans.choiceId))
          return throwError(() => new Error('Invalid Error'));
      }
      const response: Omit<response, 'id' | 'userId'> = {
        surveyId: surveyID,
        answers,
        submittedAt: new Date().toISOString()
      };
      return this.http.post<response>(this.url, response);
      })
    )
  }
}
