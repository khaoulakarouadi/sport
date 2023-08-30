import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { playersTab } from 'src/app/data folder/data';

@Component({
  selector: 'app-edit-players',
  templateUrl: './edit-players.component.html',
  styleUrls: ['./edit-players.component.css']
})
export class EditPlayersComponent implements OnInit {

  id: any;
 playersTab: any = playersTab;
 player: any= {};
 editPlayerForm: FormGroup;

  constructor(private myRouter:Router) { }

  ngOnInit() {
    this.id =  JSON.parse(localStorage.getItem("playerId"));

    for (let i = 0; i < this.playersTab.length; i++) {
     if(this.playersTab[i].id==this.id) {
      this.player= this.playersTab[i];

      break;
     }
    }
    
    
  }
  validate(){
    this.id =  JSON.parse(localStorage.getItem("playerId"));

    for (let i = 0; i < this.playersTab.length; i++) {
     if(this.playersTab[i].id==this.id) {
      this.playersTab[i]=this.player;

      break;
     }
    }
    this.myRouter.navigate(["admin"]);

    }


}
