import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResultsService } from '../service/results.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

interface Answer { answerID: number; answerText: string; count: number; }
interface ResultQuestion { questionID: number; questionText: string; answers: Answer[]; }

@Component({
  selector: 'survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css'],
})
export class SurveyDetailsComponent implements OnInit {
  results: ResultQuestion[] = [];
  respondentCount = 0;
  viewMode: 'text' | 'chart' = 'text';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Count' } },
      x: { title: { display: true, text: 'Choices' } },
    },
  };
  public barChartType: ChartType = 'bar';

  constructor(
    private resultsService: ResultsService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) this.loadResults(id);
  }

  private loadResults(id: number) {
    this.spinner.show();
    this.resultsService.getResults(id).subscribe({
      next: (data) => {
        this.results = data.results;
        this.respondentCount = data.respondentCount;
        this.spinner.hide();
      },
      error: (err) => {
        console.error(err);
        this.results = [];
        this.respondentCount = 0;
        this.spinner.hide();
      },
    });
  }
  getPercentage(count: number, total: number): number {
    return total > 0 ? (count / total) * 100 : 0;
  }
  toggleView() {
    this.viewMode = this.viewMode === 'text' ? 'chart' : 'text';
  }

  chartDataFor(q: ResultQuestion): ChartData<'bar'> {
    return {
      labels: q.answers.map(a => a.answerText),
      datasets: [{
        data: q.answers.map(a => a.count),
        backgroundColor: '#07076E',
        hoverBackgroundColor: '#3F51B5',
      }],
    };
  }
}