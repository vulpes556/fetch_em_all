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

  const fetchData = async (url) => {
    return await fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("error during fetch");
      }
    });
  };

  const fetchUserPokemons = async () => {
    const userPokemonData = await Promise.all(
      usersPokemon.map((url) => fetchData(url))
    );
    console.log('it is data:',userPokemonData);
    
    setUserPokemon(userPokemonData);
  };

  useEffect(() => {
    try {
      fetchData("https://pokeapi.co/api/v2/location").then(location => {
        setLocations(location.results)
        fetchUserPokemons()
      })
    } catch (error) { console.log(error) }

  }, [])

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  async function handleLocationClick(locationurl) {
    


    //fetchData(location.url) => fetchData(areas.length(random).url) => fetchData(pokemon_encounters.length(random).pokemon.url) 

    // const location = await fetchData(locationurl)
    // console.log("location", location)
    // const randomAreaNumb = getRandomInt(0, location.areas.length-1)
    // console.log("randomAreaNumber: ", randomAreaNumb)
    // const randomAreaUrl = location.areas[randomAreaNumb].url
    // console.log("area url: ", randomAreaUrl)
    // const randomArea = await fetchData(randomAreaUrl)
    // console.log("randomArea:", randomArea)
    // const randomPokemonIndex = getRandomInt(0, randomArea.pokemon_encounters.length-1)
    // console.log("randomPokemonIndex:", randomPokemonIndex)
    // const randomPokemonURl = randomArea.pokemon_encounters[randomPokemonIndex].pokemon.url
    // const randomPokemon2 = await fetchData(randomPokemonURl)
    // console.log("randomPokemon:", randomPokemon2)
    // setEncounterPokemon(randomPokemon2)



    // first version

    fetchData(locationurl).then(data => {
      const randomAreaNumb = getRandomInt(0, data.areas.length-1)
      const randomAreaUrl = data.areas[randomAreaNumb].url
       fetchData(randomAreaUrl).then(data => {
        const randomPokemonIndex = getRandomInt(0, data.pokemon_encounters.length-1)
        const randomPokemonUrl = data.pokemon_encounters[randomPokemonIndex].pokemon.url
         fetchData(randomPokemonUrl).then(pokeData => {
          setEncounterPokemon(pokeData)
          setShowLocations(false)
         })
      })
    })

console.log("encounteredPokemon:", encounterPokemon)

    // setEncounterPokemon()

    //encounteredPokemon set
    //show location set to false


  }

  const handleSelect = (pokemon) => {

    setSelectedUserPokemon(pokemon)
    console.log(pokemon);
    
  }



 


  return (
    <>
      <div className='nes-container is-rounded is-dark App' >
        <i className="nes-pokeball"></i>
        <h1>Pokemon Battle Game</h1>
        {showLocations ? <ListLocations onSelectLocation={handleLocationClick} locations={locations} /> : selectedUserPokemon ? <Battle /> : <Selector encounterPokemon={encounterPokemon} myPokemons={userPokemons} onSelect={handleSelect} goBack={()=>{setShowLocations(true)}}/>}
      </div>
    </>
  )
}

export default App
