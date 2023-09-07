import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchandisePageable } from '../interfaces/merchandisePageable';
import { MerchandiseToCreate } from '../models/merchandise-to-create';

@Injectable({
  providedIn: 'root',
})
export class MerchandiseService {
  private baseUrl = '/merchandise-service/';

  constructor(private http: HttpClient) {}
   
  public getAllPagination(page: number, size: number): Observable<any> {
    return this.http.get<MerchandisePageable[]>(
      `${this.baseUrl}api/v1/merchandise?page=${page}&size=${size}`
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

  public create(merchandiseToCreate: MerchandiseToCreate): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}api/v1/merchandise`,
      merchandiseToCreate
    );
  }

  public delete(merchandiseId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}api/v1/merchandise/${merchandiseId}`
    );
  }
}
