import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../model/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private mock_api = "https://opentdb.com/api.php?amount=5"

  constructor(private http: HttpClient) { }

  getData():Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.mock_api}`);
  }
}
