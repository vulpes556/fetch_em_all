import React from "react";
import UserPokeList from "./UserPokeList";

const Selector = ({ encounterPokemon, myPokemons , onSelect}) => {
  
  return <>
  <h1 style={{marginTop: 1 +"em"}}>Choose a pokemon</h1>
  <div className="d-flex justify-content-between" style={{margin: 3 +"em"}}>
    <div >
      <h2 style={{marginBottom: 2 +"em"}}>User's pokemons</h2>
    <UserPokeList myPokemons={myPokemons} onSelect={onSelect}/>
    </div>
    
    <div>
      <h2 style={{marginBottom: 2 +"em"}}>Encounter pokemon</h2>
      <UserPokeList myPokemons={[encounterPokemon]}/>
    </div>
  </div>
  </>;
};

export default Selector;