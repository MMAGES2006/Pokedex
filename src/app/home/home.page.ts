import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  listPokemons: any = [];

  constructor(private pokeService: PokemonService) {}

  ngOnInit()
  {
    this.pokeService.getListPokemon().subscribe((data) => {
      this.listPokemons = data.results
      console.log(data.results)
    })
  }

  handleDetail(url: any)
  {
    console.log(url)
  }
}
