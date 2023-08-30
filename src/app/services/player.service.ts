import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerUrl: string = "http://localhost:3000/players";
  constructor(private http: HttpClient) { }

  addPlayer(obj: any) {
    return this.http.post<{ msg: string }>(this.playerUrl, obj);
  }

  getAllPlayers() {
    return this.http.get<{ players: any }>(this.playerUrl);
  }


  // getPlayerById(id: number) {
  //   // return this.http.get(this.playerUrl+"/"+id);
  //   return this.http.delete<{ player: any, msg: string }>(`${this.playerUrl}/${id}`);

  // }

  getPlayerById(id: number) {
    return this.http.get<{ player: any, msg: string }>(this.playerUrl + "/" + `${id}`);
  }


  deletePlayer(id: number) {
    return this.http.get<{ msg: string }>(`${this.playerUrl}/${id}`);

  }
  updatePlayer(obj: any) {
    return this.http.put<{ msg: string }>(this.playerUrl, obj);
  }




  searchPlayerByNameOrAge(obj) {

    return this.http.post<{ players: any }>(
      this.playerUrl + "/search-player",
      obj
    );
  }


}
