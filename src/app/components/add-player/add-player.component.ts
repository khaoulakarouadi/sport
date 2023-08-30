import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  player: any = {};
  addPlayerForm: FormGroup;

  constructor(private router: Router,
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
  }
  addPlayer() {
    console.log("here the match", this.player);
    this.playerService.addPlayer(this.player).subscribe((data) => {
      console.log("here response from BackEnd", data.msg);
      this.router.navigate(["admin"]);
    });
  }
}


