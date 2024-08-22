import React, { useState } from "react";

const Selector = ({ encounterPokemon, myPokemons, onSelect, goBack }) => {
  const [showDetails, setshowDetails] = useState(null);
  const [detailedPokemon, setDetailedPokemon] = useState(null);

  return (
    <>
      <div>
        <p>A wild {encounterPokemon.name} appeared</p>
        <button
          key={encounterPokemon.name}
          type="button"
          className="nes-btn"
          onClick={() => {
            setshowDetails(encounterPokemon);
            setDetailedPokemon(null);
          }}
        >
          <img src={encounterPokemon.sprite} /> {encounterPokemon.name}
        </button>
      </div>
      <div className="pokemon-selection">
        <div className="pokemon-list">
          {myPokemons.map((pokemon) => (
            <button
              key={pokemon.name}
              type="button"
              className="nes-btn"
              onClick={() => {
                setDetailedPokemon(pokemon);
                setshowDetails(null);
              }}
            >
              <img src={pokemon.sprite} />
              {pokemon.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Selector;
