import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/interfaces';
import { GameService } from '../../services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  games: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getNominees()
        .subscribe(games => {
          this.games = games;
        });
  }

  voteGame(game: Game){

    this.gameService.voteGame(game.id)
        .subscribe((resp: any) => {
          
          if(resp.ok){
            Swal.fire('Gracias', resp.msg, 'success');
          }else{
            Swal.fire('Opss!', resp.msg, 'error');
          }

        });

  }

}
