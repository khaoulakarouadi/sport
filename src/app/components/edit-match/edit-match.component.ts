import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { T } from 'src/app/data folder/data';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {

  id: any;
  matchesTab: any;
  match: any = {};
  editForm: FormGroup;


  constructor(private myRouter: Router,
    private matchService: MatchService,
  ) { }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem("matchId"));
    this.matchService.getMatchById(this.id).subscribe((data) => {
      this.match = data.match;
    })

  }



  validate() {
    this.matchService.updateMatch(this.match).subscribe((result) => {
      console.log("here result after update", result.msg);
      this.myRouter.navigate(["admin"]);
    })


  }


}
