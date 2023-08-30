import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {
  stadiumUrl = "http://localhost:3000/stadium"
  constructor(private http: HttpClient) { }

  //Get All Stadiums
  getAllStadiums() {
    return this.http.get<{ stadiums: any }>(this.stadiumUrl);
  }

  addStadium(obj: any) {
    return this.http.post<{ msg: string }>(this.stadiumUrl, obj);
  }

}
