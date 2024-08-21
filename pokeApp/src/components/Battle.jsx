import React, { useEffect, useState } from "react";
import DisplayBattle from "./DisplayBattle";

const Battle = ({ playerPokemon, opponentPokemon }) => {
  const [playerHP, setPlayerHP] = useState(playerPokemon.hp);
  const [opponentHP, setOpponentHP] = useState(opponentPokemon.hp);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [specAtkCounter, setSpecAtkCounter] = useState(opponentPokemon.attack.special.uses)

  const calculateDamage = (attacker, defender, isNormal) => {
    const B = isNormal ? attacker.atk : attacker.specAtk;
    const D = defender.def;
    const Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217; //gives back random number between 217 and 255
    return ((((2 / 5 + 2) * B * 60) / D / 50 + 2) * Z) / 255;
  };

  const handleAttack = (isNormal) => {
    !isNormal && setSpecAtkCounter(specAtkCounter-1)

    const damage = Math.round(
      calculateDamage(playerPokemon, opponentPokemon, isNormal)
    );
    opponentHP - damage > 0 ? setOpponentHP(opponentHP - damage) : setOpponentHP(0)
      
    console.log(damage);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    if (isPlayerTurn === false && opponentHP > 0) {
      setTimeout(() => {
        const damage = Math.round(
          calculateDamage(opponentPokemon, playerPokemon, Math.random() > 0.5)
        );
        playerHP - damage > 0 ? setPlayerHP(playerHP - damage) : setPlayerHP(0)
        
        setIsPlayerTurn(true);
      }, 1000);
    }
  }, [isPlayerTurn]);


  return (
    <>
      <div className="game">
        <div className="battle">
          <DisplayBattle pokemon={playerPokemon} hp={playerHP} />
          <DisplayBattle pokemon={opponentPokemon} hp={opponentHP} />
        </div>
      </div>
      {/* Atttack buttons here */}
      <div className="attack-options">
        <button
          type="button"
          onClick={() => handleAttack(true)}
          className={`nes-btn is-warning ${!isPlayerTurn && "is-disabled" || playerHP === 0 && "is-disabled"}`}
          disabled={!isPlayerTurn || playerHP === 0}
        >
          {playerPokemon.attack.normal.name}
        </button>
        <button
          className={`nes-btn is-warning ${!isPlayerTurn && "is-disabled" || specAtkCounter < 1 && "is-disabled" || playerHP === 0 && "is-disabled"}`}
          type="button"
          onClick={() => handleAttack(false)}
          disabled={!isPlayerTurn || specAtkCounter < 1 || playerHP === 0}
        >
          {playerPokemon.attack.special.name}
          {<br />}Uses left:{specAtkCounter}
        </button>
      </div>
      {/* battle log comes here */}

      <div className="nes-container with-title is-centered is-dark">
        <p className="title">Battle log</p>
        <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
      </div>
      {playerHP === 0 && <button>Back</button>}
      {opponentHP === 0 && <button>Capture</button>}
    </>
  );
};

export default Battle;
