import { useState, useEffect } from 'react'
import Battle from './components/Battle'
import DisplayBattle from './components/DisplayBattle'
import Selector from './components/Selector'
import './App.css'
import ListLocations from './components/ListLocations'



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
  setShowLocations(true)
  setSelectedUserPokemon()

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
      <div className='nes-container is-rounded is-dark App' >
        <i className="nes-pokeball"></i>
        <h1>Pokemon Battle Game</h1>
      {showLocations ? <ListLocations locations={locations} /> : selectedUserPokemon ? <Battle /> : <Selector />}
      </div>
    </>
  )
}

export default App
