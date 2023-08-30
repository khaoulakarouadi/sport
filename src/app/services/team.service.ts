import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamUrl: string = "http://localhost:3000/team";
  constructor(private http: HttpClient) { }

  getAllTeams() {
    return this.http.get<{ teams: any }>(this.teamUrl);
  }

  addTeam(obj: any) {
    return this.http.post<{ msg: string }>(this.teamUrl, obj);
  }

  getTeamById(id: number) {
    return this.http.get<{ team: any, msg: string }>(this.teamUrl + "/" + id);
  }

  deleteTeam(id) {
    return this.http.delete(`${this.teamUrl}/${id}`);

  }
  updateTeam(obj) {
    return this.http.put(this.teamUrl, obj);
  }



}
