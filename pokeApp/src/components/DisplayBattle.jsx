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
      <p>{hp} HP</p>
      <div className="life-bar-container">
        <progress
          className="nes-progress is-success life-bar"
          value={(hp/pokemon.hp)*100}
          max="100"
        ></progress>
      </div>

      {/* {renderLifeBar(playerPokemon?.hp, playerPokemon?.maxHp)} <p>HP: {playerPokemon?.hp}</p> */}
    </div>
    //   <div className='life-bar-container'>
    //   <div className='life-bar'
    //     style={{ width: `${widthPercentage}%` }}
    //   ></div>
    // </div>
  );
};

export default DisplayBattle;
