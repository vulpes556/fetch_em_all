import React from "react";










export default function ListLocations({locations}){

    return(
<>
<div class="lists">
  <ul class="nes-list is-disc">
    {locations.map((location, i) => <li key={i}>{location.name}</li>)}
  </ul>
</div>


</>
    )
}