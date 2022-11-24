import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const PokemonCard = () => {

  const [ pokemon, setPokemon ] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => setPokemon(res.data))
  }, [])

  console.log(pokemon);

  return (
    <div className="pokemon-detail">
      <h1 className="detail-h1">{pokemon.name?.toUpperCase()}</h1>
      <img src={pokemon.sprites?.other.dream_world.front_default} alt="" />
      <div className="card-info">
        <h2>Type: {pokemon.types?.[0].type.name}</h2>
        <h2>Height: {pokemon.height}</h2>
        <h2>Weight: {pokemon.weight}</h2>
        <h2>Abilities: {pokemon.abilities?.[0].ability.name}, {' '}
        {pokemon.abilities?.[1].ability.name}.</h2>
      </div>
    </div>
  );
};

export default PokemonCard;