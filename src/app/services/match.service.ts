import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  matchURL: string = "http://localhost:3000/matches";
  constructor(private http: HttpClient) { }

  // Request to the server to get all the matches
  getAllMatches() {
    return this.http.get<{ matches: any }>(this.matchURL);
  }

  getMatchById(id: number) {
    return this.http.get<{ match: any, msg: string }>(this.matchURL + "/" + id)
    // return this.http.get(`${this.matchURL}/${id}`); Deuxiéme façon d'écriture
  }

  // Request to the server to delete specefic match
  deleteMatch(id: number) {
    return this.http.delete<{ msg: string }>(`${this.matchURL}/${id}`);
  }

  // Request to add match
  addMatch(obj: any) {
    return this.http.post<{ msg: string }>(this.matchURL, obj);    //el post c'est pour ENVOYER données te5ou 2 parametres, el adresse w l obj.
  }

  // Request to update match
  updateMatch(obj: any) {
    return this.http.put<{ msg: string }>(this.matchURL, obj);    //el put c'est pour MODIFIER données te5ou 2 parametres, el adresse w l obj.

  }
}


