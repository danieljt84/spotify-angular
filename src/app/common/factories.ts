import { Artista } from "../interfaces/artista";

export function newArtista(): Artista {
    return {
      id: '',
      imagemUrl: '',
      nome: '',
    };
  }