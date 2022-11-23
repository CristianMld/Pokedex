import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import InputName from './components/InputName'
import PokemonDetail from './components/PokemonDetail'
import Pokemons from './components/Pokemons'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<InputName/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/pokedex' element={<Pokemons/>}/>
            <Route path='/pokedex/:id' element={<PokemonDetail/>}/>
          </Route>
        </Routes>
      </HashRouter>      
    </div>
  )
}

export default App
