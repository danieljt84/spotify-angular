import { Injectable } from '@angular/core';
import { spotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { Usuario } from '../interfaces/usuario';
import {
  SpotifyArtistaParaArtista,
  SpotifyPlaylistParaPlaylist,
  SpotifyUserParaUsuario,
} from '../common/spotify-helper';
import { Playlist } from '../interfaces/playlist';
import { Router } from '@angular/router';
import { Artista } from '../interfaces/artista';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: Usuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    if (!!this.usuario) {
      return true;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    try {
      this.definirAcessToken(token);
      await this.obterSpotifyUsuario();
      return true;
    } catch (ex) {
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  obterUrlLogin() {
    const authEndpoint = `${spotifyConfiguration.authEndPoint}?`;
    const clientId = `client_id=${spotifyConfiguration.clientID}&`;
    const redirectUrl = `redirect_uri=${spotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${spotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if (!window.location.hash) return '';
    const params = window.location.href.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAcessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<Playlist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {
      offset,
      limit,
    });
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarTopArtistas(limit=10): Promise<Artista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({limit});
    return artistas.items.map(element => SpotifyArtistaParaArtista(element));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
