import "../styles/RadiosPage.css";
import {useEffect, useState } from "react";
import useFetchRadio from "../hooks/fetchRadio";

const BASE_URL = "https://de1.api.radio-browser.info/json/stations/bycountry/";
const COUNTRIES_URL = "https://de1.api.radio-browser.info/json/countries/";

export default function ListCountry() {
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState([]);
  const { data: items, loading, error, fetchApi } = useFetchRadio();


  useEffect(() => {
    fetch(COUNTRIES_URL)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error cargando países:", err));
  }, []);

  useEffect(() => {
    if (country) {
      fetchApi(`${BASE_URL}/${country}`);
    }
  }, [country, fetchApi]);

  return (
    <div className="countries-container">

      <div className="container"> 
        <label> Pais: </label>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          {countries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name} ({c.stationcount})
            </option>
          ))}
        </select>
      </div>
      
      
      <div className="container"> 
        <label> Radio: </label>
        <input
          type="text"
          placeholder="Ingrese su radio de preferencia"/>
      </div>

      <button className="load-btn" onClick={() => fetchApi(`${BASE_URL}${country}`)}>
        Recargar radios
      </button>

      {loading && <p>Cargando...</p>}

      <div className="cards-grid">
        {items.length > 0 ? (
          items.map((station) => (
            <div key={station.stationuuid} className="card">
              <img
                src={station.favicon || "https://via.placeholder.com/150"}
                alt={station.name}
                className="card-img"
              />
              <div className="card-body">
                <h2 className="card-title">{station.name}</h2>
                <p className="card-text">
                  {station.language} • {station.country}
                </p>
                <audio controls src={station.url}>
                   Error
                </audio>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No hay radios disponibles</p>
        )}
      </div>
    </div>
  );
}
