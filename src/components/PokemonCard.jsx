import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const PokemonCard = ({ url }) => {

  const [ pokemon, setPokemon ] = useState({});

  useEffect(() => {
    axios.get(url)
      .then(res => setPokemon(res.data))
  }, [])

  // console.log(pokemon);

  return (
    <Link className="links" to={`/pokedex/${pokemon.id}`}>
      <h1>{pokemon.name}</h1>    
      <img className="card-img" src={pokemon.sprites?.other.dream_world.front_default} alt="" />
    </Link>
  );
};

export default PokemonCard;