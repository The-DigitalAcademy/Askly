import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/service/survey.service';
import { survey } from 'src/app/models/survey';

interface Topic {
  name: string;
  url: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  openSurveys: survey[] = [];
  closedSurveys: survey[] = [];
  defaultImg = 'https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg';

  topics: Topic[] = [
    { name: 'Sci-fi', url: 'https://en.wikipedia.org/wiki/Science_fiction' },
    { name: 'Romance', url: 'https://en.wikipedia.org/wiki/Romance_novel' },
    { name: 'Action', url: 'https://en.wikipedia.org/wiki/Action_film' },
    { name: 'Educational', url: 'https://en.wikipedia.org/wiki/List_of_genres' },
    { name: 'Historical', url: 'https://en.wikipedia.org/wiki/Historical_fiction' }
  ];

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.surveyService.getAll().subscribe(surveys => {
      this.openSurveys = surveys.filter(s => s.isOpen);
      this.closedSurveys = surveys.filter(s => !s.isOpen);
    });
  }
}