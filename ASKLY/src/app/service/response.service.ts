import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <-- ADD THIS LINE
import { response } from '../models/response';
import { survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private readonly url = '/api/response';

  constructor(private readonly http: HttpClient) {}

  getBySurveyId(surveyID: number): Observable<response[]> {
    return this.http.get<response[]>(this.url).pipe(
      map((responses: response[]) =>
        responses.filter(r => r.surveyId === surveyID)
      )
    );
  }

  createResponse(resp: response): Observable<response> {
    return this.http.post<response>(this.url, resp);
  }
}