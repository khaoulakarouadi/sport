import { playersTab } from './../../data folder/data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.css']
})
export class SearchPlayerComponent implements OnInit {
  searchForm: FormGroup;
  players: any;

  constructor(private formbuilder: FormBuilder,
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.searchForm = this.formbuilder.group({
      name: ["", [Validators.required,]],
      age: ["", [Validators.required,]],

    })
  }

  search() {
    this.playerService
      .searchPlayerByNameOrAge(this.searchForm.value)
      .subscribe((result) => {
        console.log("here resultfrom be", result.players);
        this.players = result.players;
      });
  }

}
