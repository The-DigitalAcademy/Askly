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
     survey = this.surveyService
     data: any[] = [];
   
     ngOnInit() {
      this.survey.getAll().subscribe((data) =>
          this.data = data
       )
     }
     post() {
       
    }

    deleteItem(id: number, index: number){ {
      console.log(this.data.splice(index, 1))
    }}

    edit(){
      console.log("My edit is working")
    }

    isAdmin(){
      console.log("Admin verified")
    }
}
