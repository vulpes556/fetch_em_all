import { useState, useEffect } from 'react'
import Battle from './components/Battle'
import DisplayBattle from './components/DisplayBattle'
import LocationList from './components/LocationList'
import Selector from './components/Selector'
import './App.css'



const usersPokemon = [
  "https://pokeapi.co/api/v2/pokemon/bulbasaur",
  "https://pokeapi.co/api/v2/pokemon/charizard",
  "https://pokeapi.co/api/v2/pokemon/poliwhirl"
]


function App() {
  
  const [locations, setLocations] = useState([]); 
  const [userPokemons, setUserPokemon] = useState([]);
  
  const [showLocations, setShowLocations] = useState(true);
  
  const [selectedUserPokemon, setSelectedUserPokemon] = useState(null)
  const [encounterPokemon, setEncounterPokemon] = useState({});
  
  const  fetchData = async (url) => {
    return await fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("error during fetch");
      }
    });
  };

  
  return (
    <>
  {showLocations ? <LocationList/> : selectedUserPokemon ? <Battle/> : <Selector/>}
    </>
  )
}

export default App
