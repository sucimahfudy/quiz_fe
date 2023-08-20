import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'quiz-techcamp',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})

export class QuizComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedOption: string | null = null;
  score: number | null = null;
  playerName: string = '';
  submittedAnswers: { question: string; answer: string }[] = [];
  quizStarted: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getQuestions().subscribe((data) => {
      this.questions = data;
    });
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  startQuiz() {
    // Reset the quiz state
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
    this.score = null;
    this.submittedAnswers = []; // Reset submittedAnswers

    // Start the quiz
    this.quizStarted = true;

    // Move to the first question
    this.nextQuestion();
  }

  nextQuestion() {
  if (this.quizStarted) {
    if (this.selectedOption) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      const submittedAnswer = this.submittedAnswers.find(answer => answer.question === currentQuestion.question);

      if (submittedAnswer && submittedAnswer.answer === this.selectedOption) {
        // If the submitted answer is same as the selected option, decrement the score
        this.score--;
      }

      // Push the new answer
      this.submittedAnswers = this.submittedAnswers.filter(answer => answer.question !== currentQuestion.question); // Remove existing answer
      this.submittedAnswers.push({
        question: currentQuestion.question,
        answer: this.selectedOption,
      });
      
      // Move to the next question
      this.selectedOption = null;
      this.currentQuestionIndex++;
    }
  }
}


  
  previousQuestion() {
    if (this.quizStarted && this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedOption = null;
    }
  }

  submitQuiz(): void {
    if (this.selectedOption) {
      this.submittedAnswers.push({
        question: this.questions[this.currentQuestionIndex].question,
        answer: this.selectedOption,
      });
    }
    this.score = this.calculateScore();
  }
  
  
  calculateScore(): number {
    let score = 0;
    for (const answer of this.submittedAnswers) {
      const question = this.questions.find(
        (q) => q.question === answer.question
      );
      console.log("Submitted Answer:", answer.answer);
      console.log("Correct Answer:", question?.answer);
      if (question && answer.answer === question.answer) {
        score++;console.log("Score:", score);
      }
    }
    console.log("Final Score:", score);
    return score;
  }
  
  

  retakeQuiz(): void {
    this.submittedAnswers = [];
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
    this.score = null;
  }
}

