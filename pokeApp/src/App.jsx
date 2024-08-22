import { useState, useEffect } from "react";
import Battle from "./components/Battle";
import DisplayBattle from "./components/DisplayBattle";
import Selector from "./components/Selector";
import "./App.css";
import ListLocations from "./components/ListLocations";
import pokemonData from "../../batt-bence/pokeApp/src/assets/testData";


function App() {
  const [locations, setLocations] = useState([]);
  const [userPokemons, setUserPokemon] = useState([]);
  const [userPokeURL, setUserPokeURL] = useState([
    "https://pokeapi.co/api/v2/pokemon/gyarados",
    "https://pokeapi.co/api/v2/pokemon/pikachu",
    "https://pokeapi.co/api/v2/pokemon/meowth",
    "https://pokeapi.co/api/v2/pokemon/arceus",
    "https://pokeapi.co/api/v2/pokemon/mewtwo",
    "https://pokeapi.co/api/v2/pokemon/magikarp"
    
    
  ]);

  const [showLocations, setShowLocations] = useState(true);

  const [selectedUserPokemon, setSelectedUserPokemon] = useState(null);
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
  
  const resetGame = () => {
    setUserPokemon([]);
    setUserPokeURL([
      "https://pokeapi.co/api/v2/pokemon/gyarados",
      "https://pokeapi.co/api/v2/pokemon/pikachu",
      "https://pokeapi.co/api/v2/pokemon/meowth",
      "https://pokeapi.co/api/v2/pokemon/arceus",
      "https://pokeapi.co/api/v2/pokemon/mewtwo",
      "https://pokeapi.co/api/v2/pokemon/magikarp"
    ]);  
    setSelectedUserPokemon(null);
    setEncounterPokemon({});
    setShowLocations(true);  
  }

function handleLost() {
  setShowLocations(true)
  setSelectedUserPokemon(null)
}

function handleCapture(url){
  if(!userPokeURL.includes(url)){
    setUserPokeURL([...userPokeURL, url])
  }
handleLost()
}


  const fetchUserPokemons = async () => {
    const userPokemonData = await Promise.all(
      userPokeURL.map((url) => {
        return fetchData(url).then((pokeData) => {
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
                name: pokeData.moves.length === 1 ? pokeData.moves[0].move.name: pokeData.moves[1].move.name,
                uses: 5,
              },
            },
            url: `https://pokeapi.co/api/v2/pokemon/${pokeData.name}`,
            cry: pokeData.cries.latest,
          };
        });
      })
    );
    console.log("it is data:", userPokemonData);

    setUserPokemon(userPokemonData);
  };

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
  
  useEffect(()=>{
    try{
      fetchUserPokemons()
    }catch(error){console.log(error)}

  },[userPokeURL])

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  
  async function handleLocationClick(locationurl) {

    fetchData(locationurl).then((data) => {
      const randomAreaNumb = getRandomInt(0, data.areas.length - 1);
      const randomAreaUrl = data.areas[randomAreaNumb].url;
      fetchData(randomAreaUrl).then((data) => {
        let randomPokemonIndex = getRandomInt(
          0,
          data.pokemon_encounters.length - 1
        );

        
        let randomPokemonUrl = 
          data.pokemon_encounters[randomPokemonIndex].pokemon.url;
          console.log(randomPokemonUrl);
          
          if(userPokemons.some((pokemon)=> pokemon.name === data.pokemon_encounters[randomPokemonIndex].pokemon.name )){
            handleLocationClick(locationurl)
            console.log(data.pokemon_encounters[randomPokemonIndex].pokemon.name);
            
            return;
          }
        fetchData(randomPokemonUrl).then((pokeData) => {

            setEncounterPokemon({
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
                  name: pokeData.moves.length === 1 ? pokeData.moves[0].move.name: pokeData.moves[1].move.name,
                  uses: 2,
                },
              },
              url: `https://pokeapi.co/api/v2/pokemon/${pokeData.name}`,
              cry: pokeData.cries.latest,
            });


          setShowLocations(false);
        });
      });
    }).catch(error => {console.log(error)});

    console.log("encounteredPokemon:", encounterPokemon);
  }

  const handleSelect = (pokemon) => {
    setSelectedUserPokemon(pokemon);
    console.log(pokemon);
  };
  
  

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
        ) : selectedUserPokemon ? (
          <Battle
            playerPokemon={selectedUserPokemon}
            opponentPokemon={encounterPokemon}
            onLost={handleLost}
            onWin={handleCapture}
          />
        ) : (
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
