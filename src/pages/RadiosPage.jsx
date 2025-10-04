import "../styles/RadiosPage.css";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useContext } from "react";
import { SearchContext } from "../hooks/searchContext";
import useFetchRadio from "../hooks/fetchRadio";
import { FaHeart, FaShareAlt, FaInfoCircle } from "react-icons/fa";

const BASE_URL = "https://fi1.api.radio-browser.info/json/stations/bycountry/";
const COUNTRIES_URL = "https://fi1.api.radio-browser.info/json/countries/";

export default function ListCountry() {
  const [country, setCountry] = useState("Colombia");
  const [countries, setCountries] = useState([]);
  const { data: items, loading, error, fetchApi } = useFetchRadio();
  const [q, setQ] = useState("");
  const { selectedStation, setSelectedStation } = useContext(SearchContext);
  const [infoStation, setInfoStation] = useState(null);
  const audioRef = useRef(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(COUNTRIES_URL)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error cargando países:", err));
  }, []);

  useEffect(() => {
    if (country) {
      fetchApi(`${BASE_URL}${country}`);
    }
  }, [country, fetchApi]);

  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    return k ? items.filter(c => c.name?.toLowerCase().includes(k)) : items;
  }, [items, q]);

  const toggleFavorite = (station) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.stationuuid === station.stationuuid);
      if (exists) {
        return prev.filter(f => f.stationuuid !== station.stationuuid);
      }
      return [...prev, station];
    });
  };

  const isFavorite = (stationId) => {
    return favorites.some(f => f.stationuuid === stationId);
  };

  return (
    <div className="app-container">
      {selectedStation && (
        <div className="player-bar">
          <div className="player-info">
            <img
              src={selectedStation.favicon || "/imagenes/opcion1.jpg"}
              alt={selectedStation.name}
              className="player-img"
            />
            <div>
              <h4>{selectedStation.name}</h4>
            </div>
          </div>
          <div className="player-controls">
          </div>
          <audio
              ref={audioRef}
              controls
              autoPlay
              src={selectedStation.url}
            />
          
        </div>
      )}

      <aside className="sidebar">
        <div className="sidebar-section">
          <a href="#" className="sidebar-item active">
            <svg className="sidebar-icon" viewBox="0 0 24 24">
              <path d="M12 3l-10 9h3v9h6v-6h2v6h6v-9h3z" />
            </svg>
            Inicio
          </a>
          <a href="#" className="sidebar-item">
            <svg className="sidebar-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            Buscar
          </a>
        </div>

        <div className="sidebar-section library-section">
          <div className="library-header">
            <div className="library-title">
              <svg className="sidebar-icon" viewBox="0 0 24 24">
                <path d="M4 6h2v12H4zm3 0h2v12H7zm3 0h3v12h-3zm4 0h2v12h-2zm3 0h3v12h-3z" />
              </svg>
              Tu biblioteca
            </div>
          </div>
          <div style={{ padding: '0 12px' }}>
            <h3 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>
              Favoritas ({favorites.length})
            </h3>
            {favorites.length === 0 ? (
              <p style={{ color: '#b3b3b3', fontSize: '13px', padding: '20px 0' }}>
                No tienes favoritos aún
              </p>
            ) : (
              favorites.map(station => (
                <div
                  key={station.stationuuid}
                  className="library-item"
                  onClick={() => setSelectedStation(station)}
                >
                  <img
                    src={station.favicon || "/imagenes/opcion1.jpg"}
                    alt={station.name}
                    className="library-img"
                    onError={(e) => {
                      e.currentTarget.src = "/imagenes/opcion2.jpg";
                    }}
                  />
                  <div className="library-info">
                    <div className="library-name">{station.name}</div>
                    <div className="library-meta">Radio • {station.country}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="countries-container">
          <div className="top-bar">
            <div className="nav-buttons">
              <button className="nav-btn" disabled>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11 2L5 8l6 6" />
                </svg>
              </button>
              <button className="nav-btn" disabled>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M5 2l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>

          <h1>Radios de {country}</h1>

          <div className="controls-wrapper">
            <div className="container">
              <label>País</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                {countries.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.stationcount})
                  </option>
                ))}
              </select>
            </div>
            <div className="container">
              <label>Buscar</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="¿Qué quieres escuchar?"
              />
            </div>
            <button className="load-btn" onClick={() => fetchApi(`${BASE_URL}${country}`)}>
              Recargar
            </button>
          </div>

          {!loading && filtered.length > 0 && (
            <h2 className="section-title">
              {q ? `Resultados para "${q}"` : "Popular"}
            </h2>
          )}

          {loading && <p>Cargando radios...</p>}

          <div className="cards-grid">
            {!loading && filtered.length > 0 ? (
              filtered.map((station) => (
                <div
                  key={station.stationuuid}
                  className="card"
                  onClick={() => setSelectedStation(station)}
                >
                  <img
                    src={station.favicon || "/imagenes/opcion1.jpg"}
                    alt={station.name}
                    className="card-img"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/imagenes/opcion2.jpg";
                    }}
                  />
                  <div className="card-body">
                    <h2 className="card-title">{station.name}</h2>
                    <p className="card-text">
                      {station.language} • {station.country}
                    </p>
                    <button
                      className="info-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInfoStation(station);
                      }}
                    >
                      Más info
                    </button>
                  </div>
                </div>
              ))
            ) : (
              !loading && <p>No hay radios disponibles</p>
            )}
            {!loading && !error && q && filtered.length === 0 && (
              <p>No hay resultados para "{q}"</p>
            )}
          </div>
        </div>
      </main>

      {/* MODAL */}
      {infoStation && (
        <div className="modal-overlay" onClick={() => setInfoStation(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setInfoStation(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <div className="modal-header">
              <img
                src={infoStation.favicon || "/imagenes/opcion1.jpg"}
                alt={infoStation.name}
                className="modal-img"
                onError={(e) => {
                  e.currentTarget.src = "/imagenes/opcion2.jpg";
                }}
              />
              <div className="modal-info">
                <div className="modal-type">Estación de Radio</div>
                <h1 className="modal-title">{infoStation.name}</h1>
                <div className="modal-meta">
                  <span>{infoStation.country}</span>
                  <span>•</span>
                  <span>{infoStation.language}</span>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-actions">
                {/* Favoritos */}
                <button
                  className="action-btn"
                  onClick={() => toggleFavorite(infoStation)}
                  title={isFavorite(infoStation.stationuuid) ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  {isFavorite(infoStation.stationuuid) ? "❤️" : "🤍"}
                </button>
                <button className="action-btn" title="Compartir">
                  🔗
                </button>
                <button className="action-btn" title="Más información">
                  ℹ️
                </button>
              </div>
              <div className="modal-details">
                <div className="detail-item">
                  <div className="detail-label">Bitrate</div>
                  <div className="detail-value">{infoStation.bitrate || 'N/A'} kbps</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Codec</div>
                  <div className="detail-value">{infoStation.codec || 'N/A'}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Idioma</div>
                  <div className="detail-value">{infoStation.language || 'N/A'}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">País</div>
                  <div className="detail-value">{infoStation.country || 'N/A'}</div>
                </div>
                {infoStation.tags && (
                  <div className="detail-item">
                    <div className="detail-label">Tags</div>
                    <div className="detail-value">{infoStation.tags}</div>
                  </div>
                )}
                {infoStation.homepage && (
                  <div className="detail-item">
                    <div className="detail-label">Website</div>
                    <div className="detail-value" style={{ fontSize: '14px', wordBreak: 'break-all' }}>
                      <a href={infoStation.homepage} target="_blank" rel="noopener noreferrer" style={{ color: '#1db954' }}>
                        Visitar sitio
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
