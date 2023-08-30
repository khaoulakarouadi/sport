import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  playersTab: any;
  findedPlayer: any = {};
  errorMsg: string;
  constructor(private router: Router,
    private playerService: PlayerService,
  ) { }



  ngOnInit() {
    this.playerService.getAllPlayers().subscribe((data) => {
      console.log("here is ALL Players", data);
      this.playersTab = data;
    })


  }

  getPlayerById(id: number) {
    this.router.navigate([`playerinfo/${id}`]);
  }
}

  // displayPlayer(id: number) {
  //   alert(`player n° ${id} is displayed`);
  //   this.router.navigate(["playerinfo"]);
  // }
  // updatePlayer(id: number) {
  //   localStorage.setItem("playerId", JSON.stringify(id));
  //   this.router.navigate(["editplayer"]);

  // }


  // deletePlayer(id: number) {
  //   alert(`player n° ${id} is deleted`);
  //   this.playerService.deletePlayer(id).subscribe(
  //     (response) => {
  //       console.log("Here response after delete", response.msg)
  //       //reloadDataFunction houni
  //     });

  // }

