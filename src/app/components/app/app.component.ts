import { Component ,OnInit} from '@angular/core';
import { Question } from 'src/app/models/question';
import { CountryService } from 'src/app/service/country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  buttonnext:boolean=false;
  answer:String="";
  questions! :Question[];
  currentQuestion!:Question;
  constructor(private countryService:CountryService){}

  ngOnInit(): void {
    this.questions=[];
    this.getAllCountry(); 
  }
  getAllCountry(){
    this.countryService.getAllCountrys().subscribe(res=>{
      const random :number = Math.floor(Math.random() * 255);
      const answers : String[] =[res[random].name.common,res[Math.floor(Math.random() * 255)].name.common,res[Math.floor(Math.random() * 255)].name.common,res[Math.floor(Math.random() * 255)].name.common];

     this.currentQuestion = {pays:res[random].name.common,capital:res[random].capital,answers:this.fisherYatesShuffle(answers),correct_answer:res[random].name.common};

      res.map((res)=>{
        this.questions.push({pays:res.name.common,capital:res.capital,answers:[],correct_answer:res.name.common})
      })
      
    },err=>{
      console.log(err);
    })
  };
  clicAnswer(answer:any,id:number){
    let options = document.querySelectorAll(".option");
    this.answer = answer;
    if(answer === this.currentQuestion.correct_answer){
      options[id].classList.add("correct_answer");
    }else{
      options[id].classList.add("wrong_answer");
      options[this.currentQuestion.answers.indexOf(this.currentQuestion.correct_answer)].classList.add("correct_answer");
    }
    this.buttonnext=true;
  }

  nextQuestion(){
    this.buttonnext=false;
    let options = document.querySelectorAll(".option");
    for (let index = 0; index < options.length; index++) {
      options[index].classList.remove("correct_answer");
      options[index].classList.remove("wrong_answer");
    }
    const random :number = Math.floor(Math.random() * 255);
    const answers : String[] =[this.questions[random].pays,this.questions[Math.floor(Math.random() * 255)].pays,this.questions[Math.floor(Math.random() * 255)].pays,this.questions[Math.floor(Math.random() * 255)].pays];
    this.currentQuestion = {pays:this.questions[random].pays,capital:this.questions[random].capital,answers:this.fisherYatesShuffle(answers),correct_answer:this.questions[random].pays};
  }
private fisherYatesShuffle(arr:String[]){
  for(var i =arr.length-1 ; i>0 ;i--){
      var j = Math.floor( Math.random() * (i + 1) ); //random index
      [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
  }
  return arr;
}
}
