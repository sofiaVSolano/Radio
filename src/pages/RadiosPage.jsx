import "../styles/RadiosPage.css";
import { useEffect, useState, useMemo } from "react";
import useFetchRadio from "../hooks/fetchRadio";


const BASE_URL = "https://de1.api.radio-browser.info/json/stations/bycountry/";
const COUNTRIES_URL = "https://de1.api.radio-browser.info/json/countries/";

export default function ListCountry() {
  const [country, setCountry] = useState("Colombia")
  const [countries, setCountries] = useState([]);
  const { data: items, loading, error, fetchApi } = useFetchRadio();
  const [q, setQ] = useState("")


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

  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    return k ? items.filter(c => c.name?.toLowerCase().includes(k)) : items;
  }, [items, q]);

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
        <input style={{ color: "black" }} value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ingrese su radio de preferencia" />
      </div>

      <button className="load-btn" onClick={() => fetchApi(`${BASE_URL}${country}`)}>
        Recargar radios
      </button>

      {loading && <p>Cargando...</p>}

      <div className="cards-grid">
        {filtered.length > 0 ? (
          filtered.map((station) => (
            <div key={station.stationuuid} className="card">
              <img
                src={station.favicon || "/imagenes/opcion1.jpg"} // Si la radio no cuenta con ícono se muestra opcion1.jpg
                alt={station.name}
                className="card-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/imagenes/opcion2.jpg" // Si falla la carga de la imagen pero exste se muestra opcion2.jpg
                }}
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
        {!loading && !error && filtered.length === 0 && (
          <p>No hay resultados para "{q}".</p>)

        }
      </div>
    </div>
  );
}
