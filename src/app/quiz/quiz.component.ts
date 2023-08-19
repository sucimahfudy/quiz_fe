import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'quiz-techcamp',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})

export class QuizComponent implements OnInit {
  questions: any[] = [];
  submittedAnswers: any[] = [];
  currentQuestionIndex: number = 0;
  selectedOption: string | null = null;
  score: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getQuestions().subscribe((data) => {
      this.questions = data;
    });
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  nextQuestion(): void {
    if (this.selectedOption) {
      this.submittedAnswers.push({
        question: this.questions[this.currentQuestionIndex].question,
        answer: this.selectedOption,
      });
      this.selectedOption = null;
      this.currentQuestionIndex++;
    }
  }

  submitQuiz(): void {
    this.score = this.calculateScore();
  }
  
  calculateScore(): number {
    let score = 0;
    for (const answer of this.submittedAnswers) {
      const question = this.questions.find(
        (q) => q.question === answer.question
      );
      if (question && answer.answer === question.answer) {
        score++;
      }
    }
    return score;
  }
  

  retakeQuiz(): void {
    this.submittedAnswers = [];
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
    this.score = null;
  }
}

