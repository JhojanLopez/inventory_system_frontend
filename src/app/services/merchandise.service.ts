import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MerchandisePageable } from '../interfaces/merchandisePageable';

@Injectable({
  providedIn: 'root',
})
export class MerchandiseService {
  private baseUrl = '/merchandise-service/';

  constructor(private http: HttpClient) {}

  public getAllPagination(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<MerchandisePageable[]>(
      `${this.baseUrl}api/v1/merchandise`,
      { params: params }
    );
  }

  public findByName(name: string): Observable<any> {
    return this.http.get<MerchandisePageable[]>(
      `${this.baseUrl}api/v1/merchandise/name/${name}`
    );
  }

  public findById(merchandiseId: number): Observable<any> {
    return this.http.get<MerchandisePageable>(
      `${this.baseUrl}api/v1/merchandise/${merchandiseId}`
    );
  }
}