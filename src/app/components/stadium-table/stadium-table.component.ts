import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StadiumService } from 'src/app/services/stadium.service';

@Component({
  selector: 'app-stadium-table',
  templateUrl: './stadium-table.component.html',
  styleUrls: ['./stadium-table.component.css']
})
export class StadiumTableComponent implements OnInit {

  stadiumsTab: any;
  constructor(private router: Router,
    private stadiumService: StadiumService,
  ) { }



  ngOnInit() {

    this.stadiumService.getAllStadiums().subscribe((response) => {
      console.log("here response from backend", response);
      this.stadiumsTab = response.stadiums;

    });

  }

  displayStadiumById(id: number) {
    this.router.navigate(["stadiumInfo/" + id]);
  }



  // updateTeam(id: number) {
  //   localStorage.setItem("teamId", JSON.stringify(id));
  //   this.router.navigate(["editTeam"])

  // }
  // deleteStadium(id: any) {
  //   var stadiumsTab = JSON.parse(localStorage.getItem("stadiums") || "[]");
  //   for (let i = 0; i < stadiumsTab.length; i++) {
  //     if (stadiumsTab[i].id == id) {

  //       stadiumsTab.splice(i, 1);
  //       break;
  //     }
  //   }
  //   localStorage.setItem("stadiums", JSON.stringify(stadiumsTab));
  //   this.router.navigate(["admin"]);




  // }

}
