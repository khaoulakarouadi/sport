import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { teamsTab } from 'src/app/data folder/data';

@Component({
  selector: 'app-edit-teams',
  templateUrl: './edit-teams.component.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsComponent implements OnInit {
  id: any;
  teamsTab: any = teamsTab;
  team: any= {};
  editTeamForm: FormGroup;
 
   constructor(private myRouter:Router) { }
 
   ngOnInit() {
     this.id =  JSON.parse(localStorage.getItem("teamId"));
 
     for (let i = 0; i < this.teamsTab.length; i++) {
      if(this.teamsTab[i].id==this.id) {
       this.team= this.teamsTab[i];
 
       break;
      }
     }
     
     
   }
   validate(){
     this.id =  JSON.parse(localStorage.getItem("teamId"));
 
     for (let i = 0; i < this.teamsTab.length; i++) {
      if(this.teamsTab[i].id==this.id) {
       this.teamsTab[i]=this.team;
 
       break;
      }
     }
     this.myRouter.navigate(["admin"]);
 
     }
 

}
