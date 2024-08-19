import React from 'react'

const UserPokeList = ({myPokemons, onSelect}) => {
  return (
    <>
    {myPokemons.map(pokemon => 
    <div key={pokemon.name} onClick={()=>{onSelect(pokemon)}} >
      <h5>{pokemon.name}</h5>
      <img src={pokemon.sprites.front_default} alt={'image'} />
      <h6>{pokemon.stats[0].base_stat} HP</h6>
      <h6>{pokemon.stats[1].base_stat} AP</h6>
      <h6>{pokemon.stats[2].base_stat} DP</h6>
    </div>
    )}
    </>
  )
}

export default UserPokeList