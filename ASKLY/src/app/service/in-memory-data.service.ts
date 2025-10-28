import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { survey } from '../models/survey';
import { user } from '../models/user';
import { question } from '../models/question';
import { choice } from '../models/choice';
import { response } from '../models/response';
import { results } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    const users: user[] = [];
    const responses: response[] = [];
    const surveys: survey[] = [];
    const questions: question[] = [];
    const choices: choice[] = [];
    const results: results[] = [];

    return {users, responses, surveys, questions, choices, results};
  }
  genID<T extends {id: any}>(collection: T[]): any {
    return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
  }
}
