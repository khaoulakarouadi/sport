import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImcService {
  imcUrl: string = "http://localhost:3000/imc";

  constructor(private http: HttpClient) { }

  addImc(obj: any) {
    return this.http.post<{ msg: string }>(this.imcUrl, obj);    //el post c'est pour ENVOYER données te5ou 2 parametres, el adresse w l obj.
  }

}
