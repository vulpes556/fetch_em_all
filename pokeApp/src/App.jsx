import { useState, useEffect } from 'react'
import Battle from './components/Battle'
import DisplayBattle from './components/DisplayBattle'
import LocationList from './components/LocationList'
import Selector from './components/Selector'
import './App.css'
import ListLocations from './components/ListLocations/ListLocations'



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
  


useEffect(()=>{
  try{
    fetchData("https://pokeapi.co/api/v2/location").then(location=>{
      setLocations(location.results)
      console.log(location.results)
    })
  }catch(error){console.log(error)}

},[])



function handleLocationClick(){
  setShowLocations(false)
  
  //encounteredPokemon set
  //show location set to false
}





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
  {showLocations ? <ListLocations onLocationClick={handleLocationClick} locations={locations}/> : selectedUserPokemon ? <Battle/> : <Selector/>}
    </>
  )
}

export default App
