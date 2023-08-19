import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get<any[]>(`${this.apiUrl}/api/questions`);
  }

  submitAnswers(answers: any[]) {
    return this.http.post<any>(`${this.apiUrl}/api/submit`, answers);
  }
}
