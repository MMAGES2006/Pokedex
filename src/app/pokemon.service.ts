// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, ObservedValueOf } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PokemonService {

//   private apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0, https://pokeapi.co/api/v2/type/?limit=18&offset=0'
//   private limit = 151;
//   private offset = 0;

//   constructor(private http: HttpClient) { }

//   getListPokemon(): Observable<any>
//   {
//     return this.http.get(`${this.apiUrl}?limit=${this.limit}`)
//   }

//   getDetailsPokemon(urlPokemon: any): Observable<any>
//   {
//     return this.http.get(urlPokemon);
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private limit = 151;
  private offset = 0;

  constructor(private http: HttpClient) { }

  getListPokemon(): Observable<any> {
    return this.http.get(`${this.pokemonApiUrl}/?limit=${this.limit}&offset=${this.offset}`);
  }

  getDetailsPokemon(urlPokemon: string): Observable<any> {
    return this.http.get(urlPokemon);
  }
}