import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { pokemonContext } from '../pokemonContext/pokemonContext';
import { pokeapi } from '../services/pokeapiService';
import { PokemonCard } from './PokemonCard';

export const Pokedex = () => {
    const { pokemonSearch } = useContext(pokemonContext);
    const [nextDataPokemons, setNextDataPokemons] = useState(true);
    const [pokemons, setPokemons] = useState({
        pokemon: [],
        next: ''
    });
    const { pokemon, next } = pokemons;

    useEffect(() => {
        pokeapi().then(pokemons => setPokemons({
            pokemon: [pokemons.results],
            next: pokemons.next
        }));
    }, []);

    const nextPokemons = () => {
        if (next) {
            pokeapi(next).then(newPokemon => setPokemons({
                pokemon: [...pokemon, newPokemon.results],
                next: newPokemon.next
            }));
        }

        if (pokemon.length >= 45) {
            setNextDataPokemons(false);
        }
    };

    return (
        <div>
            <h1>Pokedex</h1>

            <div className="content">
                {
                    pokemon.length <= 0
                    &&
                    <div className="spinner"></div>
                }

                {
                    (!pokemonSearch || pokemonSearch === '')
                        ?
                            (<InfiniteScroll
                                dataLength={pokemon.length}
                                next={nextPokemons}
                                hasMore={nextDataPokemons}
                                loader={<h4>Loading...</h4>}
                                endMessage={
                                    <p>Pokedex Complete</p>
                                }
                            >
                                <ul className="pokemon-list">
                                    {pokemon.map(pokemon => pokemon.map(pokeData =>
                                        <li key={pokeData.name}>
                                            <PokemonCard pokemon={pokeData.url} />
                                        </li>
                                    ))}
                                </ul>
                            </InfiniteScroll>)
                        :
                            <ul className="pokemon-list">
                                <li>
                                    <PokemonCard pokemon={pokemonSearch} />
                                </li>
                            </ul>
                }
            </div>
        </div>
    );
};