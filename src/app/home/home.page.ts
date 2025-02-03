// import { HttpClientModule } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { PokemonService } from '../pokemon.service'

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
//   standalone: false,
// })
// export class HomePage {

//   listPokemons: any = [];

//   constructor(private pokeService: PokemonService) {}

//   ngOnInit()
//   {
//     this.pokeService.getListPokemon().subscribe((data) => {
//       this.listPokemons = data.results
//       console.log(data.results)
//     })
//   }

//   handleDetail(url: any)
//   {
//     console.log(url)
//   }
// }






// import { HttpClientModule } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { PokemonService } from '../pokemon.service';
// import { forkJoin, Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.page.html',
//   styleUrls: ['./home.page.scss'],
//   standalone: false,

// })
// export class HomePage implements OnInit {
//   listPokemons: any[] = [];
//   cards: any[] = [];
//   isExpanded = false;

//   selectedCardIndex: number | null = null; // Estado del índice de la tarjeta seleccionada

//   constructor(private pokemonService: PokemonService) {}

//   toggleCard(ind: number) {
//     // Si la tarjeta ya está abierta, la cerramos. Si no, la abrimos
//     if (this.selectedCardIndex === ind) {
//       this.selectedCardIndex = null;
//     } else {
//       this.selectedCardIndex = ind;
//     }
//   }

//   ngOnInit() {
//     this.pokemonService.getListPokemon().pipe(
//       switchMap((data: any) => {
//         const pokemonDetailsRequests: Observable<any>[] = data.results.map((pokemon: any) => this.pokemonService.getDetailsPokemon(pokemon.url));
//         return forkJoin(pokemonDetailsRequests);
//       })
//     ).subscribe(
//       (pokemonDetails: any[]) => {
//         this.listPokemons = pokemonDetails.map(pokemon => ({
//           name: pokemon.name,
//           type: pokemon.types.map((t: any) => t.type.name).join(', '),
//           url: pokemon.url,
//         }));
//       },
//       error => {
//         console.error('Error al obtener la lista de Pokémon', error);
//       }
//     );
//   }

//   handleDetail(url: string) {
//     console.log('Pokémon URL:', url);
//     // Aquí puedes redirigir a la página de detalles o realizar alguna acción adicional
//   }

  
// }






import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  listPokemons: any[] = []; 
  selectedCardIndex: number | null = null; 

  constructor(private pokemonService: PokemonService) {}

  toggleCard(index: number) {
    if (this.selectedCardIndex === index) {
      this.selectedCardIndex = null;
    } else {
      this.selectedCardIndex = index;
    }
  }

  ngOnInit() {
    this.pokemonService.getListPokemon().pipe(
      switchMap((data: any) => {
        const pokemonDetailsRequests: Observable<any>[] = data.results.map((pokemon: any) => 
          this.pokemonService.getDetailsPokemon(pokemon.url)
        );
        return forkJoin(pokemonDetailsRequests);
      })
    ).subscribe(
      (pokemonDetails: any[]) => {
        this.listPokemons = pokemonDetails.map(pokemon => ({
          name: pokemon.name,
          type: pokemon.types.map((t: any) => t.type.name).join(', '),
          url: pokemon.url,
          description: `Este es un Pokémon de tipo ${pokemon.types.map((t: any) => t.type.name).join(', ')}`,
        }));
      },
      error => {
        console.error('Error al obtener la lista de Pokémon', error);
      }
    );
  }

  handleDetail(url: string) {
    console.log('Pokémon URL:', url);
  }
}