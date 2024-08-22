import React from "react";

const DisplayBattle = ({ pokemon, hp }) => {
  return (
    <div className="pokemon-status">
      <h3>{pokemon.name}</h3>

      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        className={pokemon.isAttacking ? "attacking" : ""}
      />

      <p>HP: {hp}</p>

      <div className="life-bar-container">
        <progress
          className="nes-progress is-success life-bar"
          value={(hp/pokemon.hp)*100}
          max="100"
        ></progress>
      </div>
      
    </div>
  );
};

export default DisplayBattle;
