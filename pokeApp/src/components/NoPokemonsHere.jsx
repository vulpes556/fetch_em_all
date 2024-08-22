import React from "react";

export default function NoPokemonsHere({ back }) {


   return (
      <div className="wrong-turn">

         <section className="message-list">
            <section className="message -left">

               <div className="nes-balloon from-left is-dark">
                  <p>You took a wrong turn and ended up in a different Nintendo game !</p>
               </div>
               <br></br>
               <i className="nes-mario d-flex text-start"></i>
            </section>

         </section>
         <button onClick={back} className="nes-btn is-error">Turn back</button>

      </div>
   )
}