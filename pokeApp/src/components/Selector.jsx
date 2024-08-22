import React, { useState } from "react";
import DisplayDetails from "./DisplayDetails";

const Selector = ({ encounterPokemon, myPokemons, onSelect, goBack }) => {
  const [showDetails, setshowDetails] = useState(null);
  const [detailedPokemon, setDetailedPokemon] = useState(null);

  return (
    <>
      <div>
          <p>A wild {encounterPokemon.name} appeared</p>
        <div className="pokemon-stats-selector">
          {detailedPokemon && (
            <DisplayDetails pokemon={detailedPokemon} onSelect={onSelect} />
          )}
          <p>Against</p>
          <DisplayDetails pokemon={encounterPokemon} />
        </div>
        <hr />
        <p>Choose your pokemon</p>
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
          <div>
      <button onClick={goBack} className="nes-btn is-warning">
        Back
      </button>
      {detailedPokemon && <button onClick={() => onSelect(detailedPokemon)} className="nes-btn is-success">FIGHT !</button>}
      </div>
    </>
  );
};

export default Selector;
