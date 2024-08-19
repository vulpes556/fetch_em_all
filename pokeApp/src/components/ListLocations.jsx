import React from "react";










export default function ListLocations({locations,onSelectLocation}){



    return(
<>
<div className="lists">
  <ul className="nes-list is-disc">
    {locations.map((location, i) => <li onClick={()=>{onSelectLocation(location.url)}} id={i+1} key={i}>{location.name}</li>)}
  </ul>
</div>


</>
    )
}