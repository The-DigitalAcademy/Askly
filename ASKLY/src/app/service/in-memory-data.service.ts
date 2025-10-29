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
    const survey : survey[] = [
      {id: 1, title: 'Customer Satisfaction Survey', desc: 'We value your feedback! Please take a moment to complete our customer satisfaction survey.', questions: [], isOpen: true, createdAt: '2024-01-15T10:00:00Z', openedAt: '2024-01-16T00:00:00Z'},
      {id: 2, title: 'Employee Engagement Survey', desc: 'Your opinion matters! Help us improve the workplace by participating in our employee engagement survey.', questions: [], isOpen: false, createdAt: '2024-02-01T09:30:00Z', openedAt: '2024-02-02T00:00:00Z', closedAt: '2024-02-10T23:59:59Z' },
      {id: 3, title: 'Product Feedback Survey', desc: 'Tell us what you think about our latest product! Your feedback helps us make better products.', questions: [], isOpen: true, createdAt: '2024-03-05T14:15:00Z', openedAt: '2024-03-06T00:00:00Z' },
    ];
    const questions: question[] = [];
    const choices: choice[] = [];
    const results: results[] = [];

    return {users, responses, survey, questions, choices, results};
  }
  genID<T extends {id: any}>(collection: T[]): any {
    return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
  }
}
