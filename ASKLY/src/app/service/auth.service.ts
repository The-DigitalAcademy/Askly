import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //constructor and inject the HttpClient
  constructor(private readonly http: HttpClient ){ }

  //accessing the endpoints
  private readonly url = '/api/users';


  //register function
  register(newUser: user): Observable<user>{
    const registerUser: user = {
      id: Date.now().toString(),
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      role: newUser.role,
      password: newUser.password
    }

    return this.http.post<user>(this.url, registerUser);
  }

  //login function
  login(email: string, password: string): Observable<user>{
    return this.http.get<user[]>(`${this.url}?email=${email}&password=${password}`).pipe(
      //@ts-ignore
      map((users: any) => {
        console.log("All users: ",users);
        if(users.length === 0)
          throw new Error("User not found");

        const currUser = users[0];
        console.log("Current user: ",currUser);
        localStorage.setItem('current_user', JSON.stringify(currUser));
        return currUser;
      })
    )
  }

  //logout
  logout(): void{
     localStorage.removeItem('current_user');
  }

  //get current user
  getCurrentUser(): user | null {
    const data = localStorage.getItem('current_user');
    return data ? JSON.parse(data) : null;
  }
}
