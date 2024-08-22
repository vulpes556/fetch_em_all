import React from "react";













export default function NoPokemonsHere({back}){
   return (
    <>
    <h1>Elvesztél a világűrben!</h1>
    <button onClick={back}>Back</button>
    </>
   )

}