import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/common/factories';
import { Artista } from 'src/app/interfaces/artista';
import { SpotifyService } from 'src/app/services/spotify-service';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss'],
})
export class TopArtistaComponent implements OnInit {
  topArtista: Artista = newArtista();

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.buscarArtista();
  }

  async buscarArtista() {
    const element = await this.spotifyService.buscarTopArtistas(1);
    if (!!element) {
      this.topArtista = element.pop();
      console.log(this.topArtista)
    }
  }
}
