import React from "react";

function formatter(text) {
  text = text.replace(/-/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function ListLocations({ locations, onSelectLocation }) {
  return (
    <>
      <div className="location-selector">
        {locations.map((location, i) => (
          <button
            onClick={() => {
              onSelectLocation(location.url);
            }}
            id={i + 1}
            key={i}
            className="nes-btn is-primary"
          >
            {formatter(location.name)}
          </button>
        ))}
      </div>
    </>
  );
}