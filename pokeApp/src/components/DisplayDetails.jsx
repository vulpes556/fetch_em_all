import React from "react";

const DisplayDetails = ({ pokemon, onSelect }) => {
  return (
    <div className="card-continer">
      <div className="card">
        <div className="card-header">
          <img src={pokemon.sprite} />
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{pokemon.name}</li>
          <li className="list-group-item">{pokemon.hp} HP</li>
          <li className="list-group-item">{pokemon.atk} ATK</li>
          <li className="list-group-item">{pokemon.def} DEF</li>
        </ul>
        {/* {onSelect && <button onClick={() => onSelect(pokemon)} className="nes-btn is-success">SELECT</button>} */}
      </div>
    </div>
  );
};

export default DisplayDetails;
