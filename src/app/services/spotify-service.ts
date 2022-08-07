import { Injectable } from '@angular/core';
import { spotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { Usuario } from '../interfaces/usuario';
import { SpotifyUserParaUsuario } from '../common/spotify-helper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: Usuario;

  constructor() { 
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario(){
    if(!!this.usuario){
      return true;
    }

    const token = localStorage.getItem('token');
    if(!token){
      return false;
    }
    try{
        this.definirAcessToken(token);
        await this.obterSpotifyUsuario()
        return true;
    }catch(ex){
       return false
    }
  }

  async obterSpotifyUsuario(){
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  obterUrlLogin(){
    const authEndpoint = `${spotifyConfiguration.authEndPoint}?`;
    const clientId = `client_id=${spotifyConfiguration.clientID}&`;
    const redirectUrl = `redirect_uri=${spotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${spotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType; 
  }

  obterTokenUrlCallback(){
    if(!window.location.hash) return'';
    const params = window.location.href.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAcessToken(token:string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token',token);
  }
}
