import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { user } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  newUser : user = {
    id: '',
    name: '',
    surname: '',
    role: 'coordinator',
    email: '',
    password: ''
  }

  constructor(private readonly auth: AuthService){}

  register(): void {
    if(!this.newUser.name || !this.newUser.surname || !this.newUser.email || !this.newUser.password)
      throwError(() => new Error("Fields are invalid"));

    this.auth.register(this.newUser);
  }
}
