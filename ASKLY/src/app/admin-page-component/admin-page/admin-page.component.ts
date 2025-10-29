import { Component } from '@angular/core';
import { SurveyService } from 'src/app/service/survey.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  standalone: false
})
export class AdminPageComponent {
     constructor(private surveyService: SurveyService) {}
     survey = this.surveyService.getAll()
     data: any[] = [];

     ngOnInit() {
      this.survey.subscribe((data) =>
          this.data = data
       )
     }
     post() {
        console.log("My post is working")
    }

    delete(id: number){ {
      //console.log(this.data.id)
      this.surveyService.delete(id)
    }}

    edit(){
      console.log("My edit is working")
    }
}
