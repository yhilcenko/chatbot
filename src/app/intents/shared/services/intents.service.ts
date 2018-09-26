import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Intent } from '../domain/intent';

@Injectable({
  providedIn: 'root'
})
export class IntentsService {

  protected URL = '/api/intents';

  constructor(protected http: HttpClient) {
  }

  findAll(): Observable<Intent[]> {
    return this.http.get<Intent[]>(this.URL);
  }

  findById(id: any): Observable<Intent> {
    return this.http.get<Intent>(this.URL + '/' + id);
  }

  insert(newIntent: Intent): Observable<Intent> {
    return this.http.post<Intent>(this.URL, newIntent);
  }
}
