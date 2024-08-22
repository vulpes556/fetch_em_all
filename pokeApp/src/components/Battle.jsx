import React, { useEffect, useState } from "react";
import DisplayBattle from "./DisplayBattle";

const Battle = ({ playerPokemon, opponentPokemon,onLost, onWin }) => {
  const [playerHP, setPlayerHP] = useState(playerPokemon.hp);
  const [opponentHP, setOpponentHP] = useState(opponentPokemon.hp);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [specAtkCounter, setSpecAtkCounter] = useState(
    opponentPokemon.attack.special.uses
  );
  // const [message, setMessage] = useState(['Battle','Attack']);
  const [attacklogs, setAttacklogs] = useState(["Battle", "Select a move"]);

  const calculateDamage = (attacker, defender, isNormal) => {
    const B = isNormal ? attacker.atk : attacker.specAtk;
    const D = defender.def;
    const Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217; //gives back random number between 217 and 255
    return ((((2 / 5 + 2) * B * 60) / D / 50 + 2) * Z) / 255;
  };

  const handleAttack = (isNormal) => {
    !isNormal && setSpecAtkCounter(specAtkCounter - 1);

    const damage = Math.round(
      calculateDamage(playerPokemon, opponentPokemon, isNormal)
    );
    opponentHP - damage > 0
      ? setOpponentHP(opponentHP - damage)
      : setOpponentHP(0);

    console.log(damage);
    setIsPlayerTurn(false);
    setAttacklogs([
      ...attacklogs,
      `${playerPokemon.name} used ${
        isNormal
          ? playerPokemon.attack.normal.name
          : playerPokemon.attack.special.name
      }
      Hit: -${damage} HP`,
    ]);
  };

  useEffect(() => {
    if (isPlayerTurn === false && opponentHP > 0) {
      setTimeout(() => {
        const randomBoolean = Math.random() > 0.5;
        const damage = Math.round(
          calculateDamage(opponentPokemon, playerPokemon, randomBoolean)
        );
        playerHP - damage > 0 ? setPlayerHP(playerHP - damage) : setPlayerHP(0);

        setIsPlayerTurn(true);
        setAttacklogs([
          ...attacklogs,
          `${opponentPokemon.name} used ${
            randomBoolean
              ? opponentPokemon.attack.normal.name
              : opponentPokemon.attack.special.name
          }
          Hit: -${damage} HP`,
        ]);
      }, 1000);
    }
  }, [isPlayerTurn]);

  useEffect(() => {
    if (playerHP === 0) {
      setAttacklogs([...attacklogs, "LOST"]);
    }
    if (opponentHP === 0) {
      setAttacklogs([...attacklogs, "WIN"]);
    }
  }, [playerHP, opponentHP]);

  const addLog = (log) => {
    console.log(log);

    setAttacklogs((attacklogs) => attacklogs + "<p>" + log + "</p>");
  };

  return (
    <>
      <div className="game">
        <div className="battle">
          <div className="display-pokemon">
            <DisplayBattle pokemon={playerPokemon} hp={playerHP} />
            <DisplayBattle pokemon={opponentPokemon} hp={opponentHP} />
          </div>
          {/* Atttack buttons here */}
          <div className="attack-options">
            <button
              type="button"
              onClick={() => handleAttack(true)}
              className={`nes-btn is-warning ${
                (!isPlayerTurn && "is-disabled") ||
                (playerHP === 0 && "is-disabled")
              }`}
              disabled={!isPlayerTurn || playerHP === 0}
            >
              {playerPokemon.attack.normal.name}
            </button>
            {playerPokemon.attack.normal.name === playerPokemon.attack.special.name ? <button className="nes-btn is-warning is-disabled">No Spec Attack</button>:
            <button
              className={`nes-btn is-warning ${
                (!isPlayerTurn && "is-disabled") ||
                (specAtkCounter < 1 && "is-disabled") ||
                (playerHP === 0 && "is-disabled")
              }`}
              type="button"
              onClick={() => handleAttack(false)}
              disabled={!isPlayerTurn || specAtkCounter < 1 || playerHP === 0}
            >
              {playerPokemon.attack.special.name}
              {<br />}Uses left:{specAtkCounter}
            </button>
            }
          </div>
          {playerHP === 0 && <button onClick={onLost}>Back</button>}
          {opponentHP === 0 && <button onClick={()=>{onWin(opponentPokemon.url)}} >Capture</button>}
          <div className="nes-container with-title is-centered is-dark">
            <p className="title">Battle log</p>
            <div className="attack-logs">
              {attacklogs.map((attacklog, index) => (
                <p key={index} className="battle-log-p">{`${
                  index + 1
                }: ${attacklog}`}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Battle;

/* 
<section>
  <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-default').showModal();">
    Open dialog
  </button>
  <dialog class="nes-dialog" id="dialog-default">
    <form method="dialog">
      <p class="title">Dialog</p>
      <p>Alert: this is a dialog.</p>
      <menu class="dialog-menu">
        <button class="nes-btn">Cancel</button>
        <button class="nes-btn is-primary">Confirm</button>
      </menu>
    </form>
  </dialog>
</section>
*/
