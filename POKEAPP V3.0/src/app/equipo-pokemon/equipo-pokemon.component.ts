import { DataServiceService } from './../services/data-service.service';
import { Pokemon } from './../shared/pokemon';
import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, state} from '@angular/animations';

@Component({
  selector: 'app-equipo-pokemon',
  templateUrl: './equipo-pokemon.component.html',
  styleUrls: ['./equipo-pokemon.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('* <=> *', animate(1000)),
    ]),
  ]
})

export class EquipoPokemonComponent implements OnInit {

  pokemonTeam: Array<Pokemon> = [];
  pokemons$: Array<any> = [];
  pokemonName: Array<string> = [];
  types1: Array<string> = [];
  types2: Array<string> = [];
  moves1: Array<string> = [];
  moves2: Array<string> = [];
  img: Array<string> = [];


  constructor(private data: DataServiceService) { }

  ngOnInit() {
    this.pokemons$ = this.obtainAllLocalStorage();
    this.createPokemons();
  }

  obtainAllLocalStorage() {
    let json: Array<JSON> = [];
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    for (let i = 0; i < values.length; i++) {
      let aux = JSON.parse(values[i]);
      json.push(aux);
    }
    return json;
  }

  createPokemons() {
    for (let i = 0; i < this.pokemons$.length; i++) {
      this.pokemonTeam[i] = new Pokemon(this.pokemons$[i].id, this.pokemons$[i].name, this.pokemons$[i].spriteUrl, this.pokemons$[i].type1, this.pokemons$[i].type2, this.pokemons$[i].move1, this.pokemons$[i].move2);
    }
  }

  deletePokemon(id) {
    localStorage.removeItem(id.id);
    var index = this.pokemonTeam.indexOf(id);

    if (index > -1) {
      this.pokemonTeam.splice(index, 1);
    }
  }


  deleteTeam() {
    localStorage.clear();
    this.pokemonTeam = [];
  }

  getNameAPI(id) {
    this.data.getPokemonImages(id).subscribe(data => this.pokemonName = (data["forms"][0].name));
    return this.pokemonName;
  }

  getTypesAPI(id) {
    this.data.getPokemonImages(id).subscribe(data => this.types1.push(data["types"][0]["type"].name));
    this.data.getPokemonImages(id).subscribe(data => this.types2.push(data["types"][1]["type"].name));
    return [this.types1, this.types2];
  }

  getAbilitiesAPI(id) {
    this.data.getPokemonImages(id).subscribe(data => this.moves1.push(data["moves"][0]["move"].name));
    this.data.getPokemonImages(id).subscribe(data => this.moves2.push(data["moves"][1]["move"].name));
    return [this.moves1, this.moves2];
  }

  getImgAPI(id){
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id +".png"
  }

}
