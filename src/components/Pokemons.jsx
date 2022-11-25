import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";

const Pokemons = () => {

  const userName = useSelector(state => state.name)
  const [ pokemons, setPokemons ] = useState([]);
  const [ pokemonName, setPokemonName ] = useState('');
  const [ types, setTypes ] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1154&offset=0')
      .then(res => setPokemons(res.data.results))

    axios.get(`https://pokeapi.co/api/v2/type/`)
      .then(res => setTypes(res.data.results))
  }, [])


  // console.log(pokemons);
  const searchPokemon = () => {
    navigate(`/pokedex/${pokemonName.toLowerCase()}`)
  }

  const filterType = (e) => {
    axios.get(e.target.value)
      .then(res => setPokemons(res.data.pokemon))
  }

  const [ page, setPage ] = useState(1);
  const pokemonsPerPage = 30;
  const lastIndex = page * pokemonsPerPage;
  const firstIndex = lastIndex - pokemonsPerPage; 
  const paginatedPokemons = pokemons.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);

  const numbers = [];
  for (let i = 1; i <= totalPages; i++) {
    numbers.push(i);
  }
  // console.log(numbers);

  return (
    <div>
      <div className="welcome-page-with-pokemons">
        <h1>Welcome {userName}!</h1>
        <p>Here you can find all your favorites pokemons :D</p>
        <div>
          <input 
            type="text" 
            placeholder="Search pokemon"
            value={pokemonName}
            onChange={e => setPokemonName(e.target.value) } 
          />
          <button onClick={searchPokemon}>Search</button>
          <br />
          <label htmlFor="select">Select a pokemon type: </label>
          <select onChange={filterType} name="select" id="">
            {types.map(type => (
              <option 
              key={type.url} 
              value={type.url}
              >
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pagination">
          <button onClick={() => setPage(page-1)} 
          disabled={page === 1}>Previous page</button>
          {numbers.map(number => (
            <button 
            key={number} 
            onClick={() => setPage(number)}>{number}</button>
          ))}
          <button onClick={() => setPage(page+1)} 
          disabled={page === totalPages}>Next page</button>
      </div>

      <div className="pokemon-card">
        {paginatedPokemons.map(pokemon => (
          <PokemonCard 
          key={pokemon.url ? pokemon.url : pokemon.pokemon.url} 
          url={pokemon.url ? pokemon.url : pokemon.pokemon.url}/>
        ))}
      </div>
    </div>
  );
};

export default Pokemons;