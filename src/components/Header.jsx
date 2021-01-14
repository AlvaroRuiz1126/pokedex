import React, { useContext } from 'react';
import { useForm } from '../hooks/useForm';
import { pokemonContext } from '../pokemonContext/pokemonContext';
import { pokeapiSearch } from '../services/pokeapiService';

export const Header = () => {
    const { favPokemon, setPokemonSearch } = useContext(pokemonContext);
    const [values, handleInputChange] = useForm({ pokemon: '' });
    const { pokemon } = values;

    if(pokemon === ''){
        setPokemonSearch('');
    }

    const handleSearch = (e) => {
        e.preventDefault();
        pokeapiSearch(pokemon).then(resp => setPokemonSearch(resp));
    };

    return (
        <>
            <div className="logo">
                <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="poke-api logo" />

                <i className="fas fa-heart fa-3x"><span className="number">{favPokemon.length}</span></i>
            </div>

            <form className="search">
                <input
                    className="input"
                    placeholder="Find pokemon..."
                    type="text"
                    name="pokemon"
                    onChange={handleInputChange}
                    value={pokemon}
                />

                <button
                    className="btn-search"
                    onClick={handleSearch}
                >
                    <i className="fas fa-search fa-2x"></i>
                </button>
            </form>
        </>

    );
};