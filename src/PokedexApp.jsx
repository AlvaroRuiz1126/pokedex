import React, { useState } from 'react';
import { Header } from './components/Header';
import { Pokedex } from './components/Pokedex';
import { pokemonContext } from './pokemonContext/pokemonContext';
import './styles.css';

const initialFavPokemon = JSON.parse(localStorage.getItem("pokemon")) || [];

const PokedexApp = () => {
  const [pokemonSearch, setPokemonSearch] = useState();
  const [favPokemon, setFavPokemon] = useState(initialFavPokemon);

  return (
    <>
      <div className="main">
        <div className="content">
          <pokemonContext.Provider value={{ pokemonSearch, favPokemon, setPokemonSearch, setFavPokemon }} >
            <Header />

            <Pokedex />
          </pokemonContext.Provider>
        </div>
      </div>
    </>
  );
}

export default PokedexApp;