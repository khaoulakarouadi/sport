import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Input() X : any ;
  @Output() matchesOutput: EventEmitter<any> =new EventEmitter;

  constructor(private mService:MatchService) { }

  ngOnInit() {
  }
  scoreColor(scoreOne:any,scoreTwo:any){
    if(scoreOne>scoreTwo){
      return "green"
    }
    else if(scoreOne<scoreTwo){
      return "red"
    }
    else {
      return "blue"
    }
  }
  scoreForme(scoreOne: any, scoreTwo: any){
    if(scoreOne>scoreTwo){
      return true;
    }
    else{
      return false;
    }
  }
deleteMatch(id){
  this.mService.deleteMatch(id).subscribe((data)=>{
    console.log("here data after delete",data.msg);
    this.mService.getAllMatches().subscribe((response)=>{
this.matchesOutput.emit(response.matches);
    })
  })
}
}
