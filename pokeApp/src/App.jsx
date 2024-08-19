import { useState, useEffect } from 'react'
import './App.css'
import ListLocations from './components/ListLocations/ListLocations'






async function fetchData(url) {
  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json()
    console.log( data)
    return data
  } else {
    throw new Error("Error while fetching data")
  }
}








function App() {

  const [locations, setLocations] = useState([])


  useEffect(() => {
    try {
      fetchData("https://pokeapi.co/api/v2/location").then(locations => {
        setLocations(locations.results)
      })
    } catch (error) { console.log(error) }
  },[])




return (
  <>
  {locations.map(location => 
    <ListLocations key={location.name} name={location.name}/>
  )}
  </>
)
}

export default App
