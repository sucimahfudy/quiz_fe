import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://quiz-be-git-sucimahfudy-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com';

  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get<any[]>(`${this.apiUrl}/api/questions`);
  }

  submitAnswers(answers: any[]) {
    return this.http.post<any>(`${this.apiUrl}/api/submit`, answers);
  }
}
