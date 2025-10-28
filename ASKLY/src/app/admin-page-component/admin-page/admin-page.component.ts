import { Component } from '@angular/core';
import data  from "../../fakeData"

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  standalone: false
})
export class AdminPageComponent {
    data = data
    
    post() {
       console.log("My post is working")
    }

    delete() {
      console.log("My delete is working")
    }

    edit(){
      console.log("My edit is working")
    }
}
