import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = '/users-service/';
  
  constructor(private http: HttpClient) {}
  
  public isUserLogged(): boolean{
    return !!localStorage.getItem('user');
  }

  public getUserLogged(): User{
    return JSON.parse(localStorage.getItem('user'));
  }

  public logout(): boolean{
    localStorage.removeItem('user')
    return true;
  }

  public getAll(): Observable<any> {
    return this.http.get<User[]>(
      `${this.baseUrl}api/v1/user`
    );
  }
}
