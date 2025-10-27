import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { Observable, throwError, of } from 'rxjs';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Keys to access the local storage
  private readonly KEYS = {
    USERS: 'users',
    CURRENT: 'current_user'
  };

  //constructor and inject the storage
  constructor(private storage: StorageService){ }

  //Helper function to get a user by email
  getCurrentUser(email: string): user | null {
    const raw = localStorage.getItem(email);
    return raw ? JSON.parse(raw) : null;
  }

  private getUsers(): user[] {
    return this.storage.load<user[]>(this.KEYS.USERS) || [];
  }

  //register function
  register(newUser: user): Observable<user>{
    const allUsers = this.getUsers();
    if(this.getCurrentUser(newUser.email))
      return throwError(() => new Error('Email already exists'));

    const registerUser: user = {
      id: Date.now().toString(),
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      role: newUser.role,
      password: newUser.password
    }
    allUsers.push(registerUser);
    this.storage.save(this.KEYS.USERS, allUsers);
    return of(registerUser);
  }

  //login function
  login(email: string, password: string): Observable<user>{
    const allUsers = this.getUsers();
    const currUser = allUsers.find(u => u.email === email && u.password === password);
    if(!currUser)
      return throwError(() => new Error('Invalid login'));

    this.storage.save(this.KEYS.CURRENT, currUser);
    return of(currUser);
  }

  //logout
  logout(): void{
    return this.storage.remove(this.KEYS.CURRENT);
  }
}
