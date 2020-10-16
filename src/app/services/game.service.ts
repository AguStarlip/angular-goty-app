import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/interfaces';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private games: Game[] = [];

  constructor(private http: HttpClient) { }

  getNominees(){

    if(this.games.length > 0){
      // no tenemos juegos
      return of(this.games)
    }else{
      return this.http.get<Game[]>(`${url}/api/goty`)
                .pipe(
                  tap(games => this.games = games)
                );
    }

  }

  voteGame(id: string){

    return this.http.post(`${url}/api/goty/${id}`,{})
              .pipe(
                catchError(err => {
                  return of(err.error);
                })
              )

  }

}
