import React from "react";

const DisplayBattle = ({ pokemon }) => {
  return (
    <div className="pokemon-status">
      <h3>{pokemon.name}</h3>

      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        className={pokemon.isAttacking ? "attacking" : ""}
      />
      <div className="life-bar-container">
        <progress
          className="nes-progress is-success life-bar"
          value="90"
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
