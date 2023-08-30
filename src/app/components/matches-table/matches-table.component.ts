import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';
import { JwPaginationModule } from 'jw-angular-pagination';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
  matchesTab: any;
  pageOfItems: Array<any>
  constructor(
    private myRouter: Router,
    private matchSerice: MatchService,
    private JPM:JwPaginationModule,
  ) { }

  reloadData() {      //c'est la fonction mta3 el GetAll nesta3mlouha dima donc 7atineha fi fonction haka pour faire appel liha apres kol mara nest7a9ha
    this.matchSerice.getAllMatches().subscribe(
      (response) => {
        console.log("here response from backend", response);
        this.matchesTab = response.matches;
      });
  }

  ngOnInit() {
    this.reloadData();
  }
  displayMatch(id: number) {

    this.myRouter.navigate([`matchinfo/${id}`]);
  }
  updateMatch(id: number) {

    localStorage.setItem("matchId", JSON.stringify(id));
    this.myRouter.navigate(["editmatch"]);

  }
  deleteMatch(id: number) {

    this.matchSerice.deleteMatch(id).subscribe(
      (response) => {
        console.log("Here response after delete", response.msg)
        this.reloadData();
      })

  }
  onChangePage(x: Array<any>) {
    // update current page of items
    this.pageOfItems = x;
    }
}
