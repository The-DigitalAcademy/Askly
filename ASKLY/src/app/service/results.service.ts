import { choice } from './../models/choice';
import { question } from './../models/question';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private readonly url = '/api/results';
  constructor(private readonly http: HttpClient){}
  getResults(surveyID: number): Observable<any>{
    return this.http.get<any[]>(`${this.url}/responses?surveyId=${surveyID}`).pipe(
      //@ts-ignore
      map(responses => {
        return this.http.get<any>(`${this.url}/surveys/${surveyID}`).pipe(
          //@ts-ignore
          map(survey => {
            return survey.questions.map((q: any) =>{
              const counts = q.choices.map((c: any) => {
                const count = responses.filter((r: any) => r.answers.some((a: any) => a.questionId === q.id && a.choiceId === c.id)).length;
                return {choiceText: c.text, count};
              });
              return {question: q.text, choice: counts};
            });
          })
        );
      }),
      //@ts-ignore
      switchMap(obs => obs)
    );
  }
}
