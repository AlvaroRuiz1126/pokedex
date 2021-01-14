import React, { useEffect, useState, useContext } from 'react';
import { pokemonContext } from '../pokemonContext/pokemonContext';

export const PokemonCard = ({ pokemon }) => {
    const { favPokemon, setFavPokemon } = useContext(pokemonContext);
    const [pokemonInfo, setPokemonInfo] = useState({
        id: null,
        name: '',
        img: '',
        types: [],
    });
    const { name, types } = pokemonInfo;
    const favourite = favPokemon.includes(name) ? true : false;
    //const [favourite, setFavourite] = useState();


    useEffect(() => {
        if (pokemon.abilities) {
            setPokemonInfo({
                id: pokemon.id,
                name: pokemon.name,
                img: pokemon.sprites.front_default,
                types: pokemon.types
            });
        }

        fetch(pokemon).then(resp => resp.json()).then(pokeData => setPokemonInfo({
            id: pokeData.id,
            name: pokeData.species.name,
            img: pokeData.sprites.front_default,
            types: pokeData.types
        }));

    }, [pokemon, favourite]);

    const updateFav = () => {
        const fav = !favourite;
        
        if (fav) {
            setFavPokemon([name, ...favPokemon]);
        } else {
            const filter = favPokemon.filter(pokemonName => pokemonName !== name);
            setFavPokemon(filter);
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        updateFav();
    }

    localStorage.setItem("pokemon", JSON.stringify(favPokemon));
    console.log(favPokemon);

    return (
        <div className="pokemon-card">
            <div>
                <img src={pokemonInfo.img} alt="pokemon" />
            </div>

            <div className="pokemon-info content">
                <div className="card-top">
                    <p>{name}</p>
                    <p className="pokemon-id">#{pokemonInfo.id}</p>
                </div>

                <div className="card-bottom content">
                    <div className="type">
                        {types.map(type => <p key={type.type.name}>{type.type.name}</p>)}
                    </div>

                    <button
                        className="btn"
                        onClick={handleClick}
                    >
                        <i className={`fas ${favourite ? 'fa-heart red' : 'fa-heart'}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};