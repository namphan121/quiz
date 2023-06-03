import { Component, OnInit,  ElementRef } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { Quiz } from 'src/app/model/quiz.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  data: Quiz[] =[];
  currentQuestion: number;
  options : string[] = [];
  point: number;
  wrong: number;
  isAnswer!: boolean;
  content: string;
  isDone: boolean;
  timer: any;
  minutes: number;
  seconds: number;


  constructor(private dataService: DataService, private elementRef: ElementRef){
    this.loadData();
    this.currentQuestion = 0;
    this.point = 0;
    this.wrong = 0;
    this.content = '';
    this.isDone = false;
    this.minutes = 0;
    this.seconds = 0;
  }
  
  ngOnInit(): void {
    this.startTimer();
  }

  loadData(){
    this.dataService.getData().subscribe((res: any) => {
      this.data = res.results;
      console.log('asd',res.results);
      this.getOption();
    })
  }

  startTimer() {
    this.timer = interval(1000).subscribe(x => {
        this.seconds++;
        if (this.seconds === 60){
          this.minutes++;
          this.seconds = 0;
        }
    })
  }

  stopTimer(){
    this.timer.unsubscribe();
  }

  onSelect(option: string) {
    if (option === this.data[this.currentQuestion].correct_answer) {
      this.isAnswer = true;
      this.point++;
      this.content = "Congratulation!"
    } else {
      this.wrong++;
      this.content = "Good luck next time!"
    }
  }

  nextQuiz() {
    if (this.currentQuestion < this.data.length - 1) {
      this.currentQuestion++;
      this.options = [];
      this.getOption();
      this.content = '';
    } else {
      this.stopTimer();
      this.isDone = true;
    }
  }

  getOption(){
    this.options.push(this.data[this.currentQuestion].correct_answer);
    this.data[this.currentQuestion].incorrect_answers.map((element: string) => {
      this.options.push(element);
    })
    console.log('asd',this.options);
    
    this.options.sort(() => Math.random() -0.5)
  }
}
