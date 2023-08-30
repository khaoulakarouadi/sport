import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { teamsTab } from 'src/app/data folder/data';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {

  teams: any = {};
  constructor(private router: Router, private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((response) => {
      console.log("here is All Teams", response)
      this.teams = response.teams;
    })
  }

  displayTeamById(id: number) {
    this.router.navigate(["teaminfo/" + `${id}`]);
  }



  updateTeam(id: number) {
    localStorage.setItem("teamId", JSON.stringify(id));
    this.router.navigate(["editTeam"])

  }
  deleteTeam(id: number) {
    this.teamService.deleteTeam(id).subscribe((data) => {
      this.teamService.getAllTeams().subscribe((response) => {
        console.log("here is All Teams", response)
        this.teams = response.teams;
      })
    })

  }
}
