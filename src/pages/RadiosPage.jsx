import "../styles/RadiosPage.css";
import { useEffect } from "react";
import useFetchRadio from "../hooks/fetchRadio";

const BASE_URL = "https://de1.api.radio-browser.info/json/stations/bycountry/Colombia";

export default function ListCountry() {
  const { data: items, loading, error, fetchApi } = useFetchRadio();

  useEffect(() => {
    fetchApi(BASE_URL);
  }, [fetchApi]);

  return (
    <div className="countries-container">

      <div className="container"> 
        <label> Pais: </label>
          <input 
          type="text" 
          placeholder="¿Qué estas buscando?"/>
      </div>

      <div className="container"> 
        <label> Radio: </label>
        <input
          type="text"
          placeholder="Ingrese su radio de preferencia"/>
      </div>

      <button className="load-btn" onClick={() => fetchApi(BASE_URL)}>
        Recargar radios
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p>Error al cargar: {error.message}</p>}

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
