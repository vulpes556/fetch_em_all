import React from "react";
import DisplayBattle from "./DisplayBattle";

const Battle = ({ playerPokemon, opponentPokemon }) => {
  
  return (
    <>
      <div className="game">
        <div className="battle">
          <DisplayBattle pokemon={playerPokemon} />
          <DisplayBattle pokemon={opponentPokemon} />
        </div>
      </div>
      {/* Atttack buttons here */}
      <div className="attack-options">
        <button>{playerPokemon.attack.normal.name}</button>
        <button>
          {playerPokemon.attack.special.name}
          {<br />}Uses left:szám!
        </button>
      </div>
      {/* battle log comes here */}

      <div className="nes-container with-title is-centered is-dark">
        <p className="title">Battle log</p>
        <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
      </div>
    </>
  );
};

export default Battle;
