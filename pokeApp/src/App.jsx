import { useState, useEffect } from "react";
import Battle from "./components/Battle";
import Selector from "./components/Selector";
import ListLocations from "./components/ListLocations";
import NoPokemonsHere from "./components/NoPokemonsHere";
import "./App.css";


function App() {

  // STATE variables
  const [locations, setLocations] = useState([]);
  const [userPokemons, setUserPokemon] = useState([]);
  const [noPokemonsHere, setNoPokemonsHere] = useState(false)
  const [showLocations, setShowLocations] = useState(true);
  const [selectedUserPokemon, setSelectedUserPokemon] = useState(null);
  const [encounterPokemon, setEncounterPokemon] = useState({});
  const [userPokeURL, setUserPokeURL] = useState([
    "https://pokeapi.co/api/v2/pokemon/unown", // only one attack
    "https://pokeapi.co/api/v2/pokemon/magikarp", // weak - present loss    
    "https://pokeapi.co/api/v2/pokemon/pikachu",
    "https://pokeapi.co/api/v2/pokemon/meowth",
    "https://pokeapi.co/api/v2/pokemon/arceus", // strong - presnet win    
  ]);

  // Basic fetching function
  const fetchData = async (url) => {
    return await fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("error during fetch");
      }
    });
  };

  // RESETTING game by setting defaults back
  const resetGame = () => {
    setUserPokemon([]);
    setUserPokeURL([
      "https://pokeapi.co/api/v2/pokemon/unown",
      "https://pokeapi.co/api/v2/pokemon/magikarp",
      "https://pokeapi.co/api/v2/pokemon/pikachu",
      "https://pokeapi.co/api/v2/pokemon/meowth",
      "https://pokeapi.co/api/v2/pokemon/arceus",
    ]);
    setSelectedUserPokemon(null);
    setEncounterPokemon({});
    setShowLocations(true);
  }
  //invoked when game is lost
  function handleLost() {
    setShowLocations(true)
    setSelectedUserPokemon(null)
  }

  //if we don't already have the fought pokemon, we add it to our array
  function handleCapture(url) {
    if (!userPokeURL.includes(url)) {
      setUserPokeURL([...userPokeURL, url])
    }
    handleLost()
  }

  //fetching all the data of our pokemons, transforming data for us for ease of use
  const fetchUserPokemons = async () => {
    const userPokemonData = await Promise.all(
      userPokeURL.map((url) => {
        return fetchData(url).then((pokeData) => {
          return modifyApiData(pokeData);
        });
      })
    );
    setUserPokemon(userPokemonData);
  };

  // fetch the 20 locations here
  useEffect(() => {
    try {
      fetchData("https://pokeapi.co/api/v2/location").then((location) => {
        setLocations(location.results);
        console.log(location);

      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // fetching our pokemon's data when our poke list is changed
  useEffect(() => {
    try {
      fetchUserPokemons()
    } catch (error) { console.log(error) }
  }, [userPokeURL])

  // function for getting a random number between min max args.
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // this random counter is used for reducing the chances for a random pokomon to appear multiple times
  // also, a failsafe from getting into an infinite loop
  let randomCounter = 5;
  // location, opponent pokemon selection logics
  async function handleLocationClick(locationurl) {

    // if there are no areas within a location then return error message to inform the user
    fetchData(locationurl).then((data) => {
      if (data.areas.length === 0) {
        setShowLocations(false)
        setNoPokemonsHere(true)
        return
      }

      // once location is selected then randomly choose an area and a pokemon from that area
      const randomAreaNumb = getRandomInt(0, data.areas.length - 1);
      const randomAreaUrl = data.areas[randomAreaNumb].url;
      fetchData(randomAreaUrl).then((data) => {
        let randomPokemonIndex = getRandomInt(
          0,
          data.pokemon_encounters.length - 1
        );
        let randomPokemonUrl = data.pokemon_encounters[randomPokemonIndex].pokemon.url;

        // if the random pokemon is already caught then generate a new pokemon - recursive
        if (userPokemons.some((pokemon) => pokemon.name === data.pokemon_encounters[randomPokemonIndex].pokemon.name) && randomCounter > 1) {
          handleLocationClick(locationurl)
          randomCounter--;
          return;
        }
        randomCounter = 5;
        // fetch the random pokemons data and modify it into a usable format
        fetchData(randomPokemonUrl).then((pokeData) => {
          setEncounterPokemon(modifyApiData(pokeData));
          setShowLocations(false);
        });
      });
    }).catch(error => { console.log(error) });

    console.log("encounteredPokemon:", encounterPokemon);
  }

  // function to set our pokemon to fight
  const handleSelect = (pokemon) => {
    setSelectedUserPokemon(pokemon);
    console.log(pokemon);
  };

  // handling back button functionality
  function handleBack() {
    setNoPokemonsHere(false)
    setShowLocations(true)
  }

  //reducing pokemon data for our needs
  function modifyApiData(pokeData) {
    return {
      name: pokeData.name,
      hp: pokeData.stats.find((stat) => stat.stat.name === "hp")
        .base_stat,
      def: pokeData.stats.find((stat) => stat.stat.name === "defense")
        .base_stat,
      atk: pokeData.stats.find((stat) => stat.stat.name === "attack")
        .base_stat,
      specAtk: pokeData.stats.find(
        (stat) => stat.stat.name === "special-attack"
      ).base_stat,
      speed: pokeData.stats.find((stat) => stat.stat.name === "speed")
        .base_stat,
      sprite: pokeData.sprites.front_default,
      type: pokeData.types[0].type.name,
      attack: {
        normal: {
          name: pokeData.moves[0].move.name,
          uses: 1000,
        },
        special: {
          name: pokeData.moves.length === 1 ? pokeData.moves[0].move.name : pokeData.moves[1].move.name,
          uses: 2,
        },
      },
      url: `https://pokeapi.co/api/v2/pokemon/${pokeData.name}`,
      cry: pokeData.cries.latest,
    }
  }

  return (
    <>
      <div className="nes-container is-rounded is-dark App">

        <div className="titleBar">
          <i className="nes-pokeball"></i>
          <h1>Pokémon Battle Game</h1>
          <button className="nes-btn is-error" onClick={resetGame}>Reset Game</button>
        </div>

        {showLocations ? (
          <ListLocations
            onSelectLocation={handleLocationClick}
            locations={locations}
          />
        ) : noPokemonsHere ? (
          <NoPokemonsHere back={handleBack} />
        ) : selectedUserPokemon ? (
          <Battle
            playerPokemon={selectedUserPokemon}
            opponentPokemon={encounterPokemon}
            onLost={handleLost}
            onWin={handleCapture}
            random={getRandomInt}
          />) : (
          <Selector
            encounterPokemon={encounterPokemon}
            myPokemons={userPokemons}
            onSelect={handleSelect}
            goBack={() => {
              setShowLocations(true);
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;