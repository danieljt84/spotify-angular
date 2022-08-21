import { Artista } from "../interfaces/artista";
import { Playlist } from "../interfaces/playlist";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse){
    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl:  user.images.length!=0 ? user.images.pop().url : ''
    }
}

export function SpotifyPlaylistParaPlaylist(playlist:SpotifyApi.PlaylistObjectSimplified): Playlist{
    return {
        id:playlist.id,
        nome:playlist.name,
        imagemUrl: playlist.images.length!=0? playlist.images.pop().url : ''
    }
}

export function SpotifyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull) :  Artista{
    return {
      id: spotifyArtista.id,
      imagemUrl: spotifyArtista.images.sort((a,b) => a.width - b.width).pop().url,
      nome: spotifyArtista.name
    };
  }

