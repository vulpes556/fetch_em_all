import { useEffect, useRef, useState } from 'react';
import './App.css';
import pokemonData from './assets/testData';


function App() {

  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [message, setMessage] = useState("Choose your Pokemon");
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [attacklogs, setAttacklogs] = useState("");
  const attackSound = useRef(null);

  const resetGame = () => {
    setPlayerPokemon(null);
    setOpponentPokemon(null);
    setMessage("");
    setIsPlayerTurn(true);
    setAttacklogs("");
  }

  const choosePokemon = (pokemon) => {
    setPlayerPokemon({ ...pokemon, attacks: [...pokemon.attacks] });

    const randomOpponent = pokemonData[Math.floor(Math.random() * pokemonData.length)]

    setOpponentPokemon({
      ...randomOpponent, attacks: [...randomOpponent.attacks]
    });

    setMessage(`You chose ${pokemon.name}! Opponent sent out ${randomOpponent.name}`);

    setIsPlayerTurn(true);

    setAttacklogs("");
  }

  const renderLifeBar = (hp, maxHp) => {
    const widthPercentage = (hp / maxHp) * 100

    return (
      <div className='life-bar-container'>
        <div className='life-bar'
          style={{ width: `${widthPercentage}%` }}
        ></div>
      </div>
    )
  }

  const addLog = (log) => {
    console.log(log);

    setAttacklogs((attacklogs) => attacklogs + "<p>" + log + "</p>");
  }

  const playerAttack = (selectedAttack) => {
    if (!playerPokemon || !opponentPokemon) {
      setMessage("Choose your Pokemon to start battle");
      return
    }



    // check all attacks
    const availableAttacks = playerPokemon.attacks.filter((attack) => attack.uses > 0);

    if (availableAttacks.length == 0) {
      const log = `${playerPokemon.name} has no attack left!`;
      setMessage(log);
      addLog(log);
      return
    }

    // check current attack
    if (selectedAttack.uses <= 0) {
      setMessage(`No more uses left for ${selectedAttack.name}`);
      return
    }

    if (Math.random() > selectedAttack.accuracy) {
      const log = `${playerPokemon.name} tried to use ${selectedAttack.name} but missed!`;

      setMessage(log);
      addLog(log);

      setTimeout(() => {
        setIsPlayerTurn(false);
        opponentAttack();
      }, 1000);

      return
    }

    // play attack sound
    if (attackSound.current) {
      attackSound.current.play();
    }

    const playerDmaage = selectedAttack.damage;

    const opponentHp = opponentPokemon.hp - playerDmaage >= 0 ? opponentPokemon.hp - playerDmaage : 0

    setOpponentPokemon({
      ...opponentPokemon,
      hp: opponentHp
    });

    selectedAttack.uses -= 1;

    let commentary = "";

    if (playerDmaage > 10) { commentary = "It's super Effective" }
    if ((playerAttack?.name == "Confusion") && (Math.random() < 0.5)) {
      commentary += `The opponent ${opponentPokemon.name} is confused!`;
    }

    const log = `You used ${selectedAttack.name} for ${playerDmaage} damage! ${commentary}`;

    setMessage(log);
    addLog(log);

    if (opponentHp <= 0) {
      setMessage(`You win! ${playerPokemon.name} wins!`);

      return
    }

    setTimeout(() => {
      setIsPlayerTurn(false)
      opponentAttack()
    }, 1000);
  }

  const opponentAttack = () => {
    if (!playerPokemon || !opponentPokemon) {
      setMessage("Choose your Pokemon to start battle");
      return
    }

    const availableAttacks = opponentPokemon.attacks.filter((attack) => attack.uses > 0);

    if (availableAttacks.length == 0) {
      const log = `${opponentPokemon.name} has no attack left!`;
      setMessage(log);
      addLog(log);
      return
    }

    const selectedAttack = availableAttacks[Math.floor(Math.random() * availableAttacks.length)]

    // check current attack
    if (selectedAttack.uses <= 0) {
      setMessage(`No more uses left for ${selectedAttack.name}`);
      return
    }

    if (Math.random() > selectedAttack.accuracy) {
      const log = `${opponentPokemon.name} tried to use ${selectedAttack.name} but missed!`;

      setMessage(log);
      addLog(log);

      setTimeout(() => {
        setIsPlayerTurn(true);
      }, 1000);

      return
    }

    // play attack sound
    if (attackSound.current) {
      attackSound.current.play();
    }

    const opponentDmaage = selectedAttack.damage;

    const playerHp = playerPokemon.hp - opponentDmaage >= 0 ? playerPokemon.hp - opponentDmaage : 0

    setPlayerPokemon({
      ...playerPokemon,
      hp: playerHp
    });

    selectedAttack.uses -= 1;

    let commentary = "";

    if (opponentDmaage > 10) { commentary = "It's super Effective" }
    if ((selectedAttack?.name == "Confusion") && (Math.random() < 0.5)) {
      commentary += `Your ${playerPokemon.name} is confused!`;
    }

    const log = `${opponentPokemon.name} used ${selectedAttack.name} for ${opponentDmaage} damage! ${commentary}`;

    setMessage(log);
    addLog(log);

    if (playerHp <= 0) {
      setMessage(`You lose! ${opponentPokemon.name} wins!`);

      return
    }

    setTimeout(() => {
      setIsPlayerTurn(true)
    }, 1000);

  }

  return (
    <div className='nes-container is-rounded is-dark App' >
      <div className='titleBar'>
        <i className="nes-pokeball"></i>
        <h1>Pokémon Battle Game</h1>
        <button className='nes-btn is-error' onClick={resetGame}>Reset Game</button>
      </div>

      <p className='message'>{message}</p>

      {playerPokemon?.hp == null && opponentPokemon?.hp == null && (
        <div className='pokemon-selection'>
          
          <div className='pokemon-list'>
            {pokemonData.map((pokemon) => (
              <button key={pokemon.name} type='button' className='nes-btn' onClick={() => choosePokemon(pokemon)}><img src={pokemon.sprite}/>
                {pokemon.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className='game'>
        {
          playerPokemon?.hp &&
          <div className='battle'>


            <div className='pokemon-status'>

              <div>

                <h3>{playerPokemon?.name}</h3>

                <img src={playerPokemon?.sprite}
                  alt={playerPokemon?.name}
                  className={playerPokemon?.isAttacking ? "attacking" : ""}
                />

                {renderLifeBar(playerPokemon?.hp, playerPokemon?.maxHp)} <p>HP: {playerPokemon?.hp}</p>
              </div>


              <div>

                <h3>{opponentPokemon?.name}</h3>

                <img src={opponentPokemon?.sprite}
                  alt={opponentPokemon?.name}
                  className={opponentPokemon?.isAttacking ? "attacking" : ""}
                />

                {renderLifeBar(opponentPokemon?.hp, opponentPokemon?.maxHp)} <p>HP: {opponentPokemon?.hp}</p>

              </div>
            </div>

            {isPlayerTurn &&
              playerPokemon?.hp > 0 &&
              opponentPokemon?.hp > 0 && (
                <div className='attack-options'>
                  {playerPokemon?.attacks.map((selectedAttack) => (
                    <button key={selectedAttack?.name} className='nes-btn is-warning'
                      onClick={() => playerAttack(selectedAttack)}
                      disabled={selectedAttack.uses <= 0}
                    >
                      {selectedAttack.name} ({selectedAttack.damage} dmg)
                    </button>
                  ))}
                </div>

              )
            }
            <div className='nes-container with-title is-centered attack-logs'>
              <a href="#" className="nes-badge">
                <span className="is-dark">Battle Log</span>
              </a>
              <div className='lists'>
                <ul className='nes-list is-circle' dangerouslySetInnerHTML={{ __html: attacklogs }}>
                </ul>
              </div>
            </div>
          </div>
        }





      </div>

      {/* Audio element for attack sound */}
      <audio
        ref={attackSound}
        src="https://vgmtreasurechest.com/soundtracks/pokemon-sfx-gen-3-attack-moves-rse-fr-lg/izqqhmeayp/Tackle.mp3"
        preload="auto"
      />

    </div>
  )
}

export default App