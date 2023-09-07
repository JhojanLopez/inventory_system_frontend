import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit{

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
