import React, { useState } from "react";
import UserPokeList from "./UserPokeList";

const Selector = ({ encounterPokemon, myPokemons , onSelect, goBack}) => {
  const [showDetails, setShowDetails] = useState(false)
  return <>
    
        <div className='pokemon-selection'>
          
          <div className='pokemon-list'>
            {myPokemons.map((pokemon) => (
              <button key={pokemon.name} type='button' className='nes-btn'onClick={() => onSelect(pokemon)}>
                <img src={pokemon.sprite}/>
                {pokemon.name}
              </button>
            ))}
          </div>
        </div>
        
      
  </>;
};

export default Selector;