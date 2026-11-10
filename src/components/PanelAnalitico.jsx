import { useState } from 'react';
import { obtenerSerieDeTiempo } from '../services/dataService';
import TablaDatos from './TablaDatos'; // Reutilizado de la práctica 3.2

export default function PanelAnalitico() {
  // Define los tres estados solicitados[cite: 3, 4]
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const dispararPeticion = async () => {
    // Cambia el estado cargando a true y limpia los errores
    setCargando(true);
    setError(null);

    // Parámetros de ejemplo para Open-Meteo (latitud y longitud de CDMX)
    const params = {
      latitude: 19.4285,
      longitude: -99.1277,
      hourly: 'temperature_2m'
    };

    // Bloque try/catch/finally
    try {
      const resultado = await obtenerSerieDeTiempo(params);
      setDatos(resultado); // Guarda los datos
    } catch (err) {
      setError(err.message || 'Ocurrió un error al consultar la API.'); // Guarda el mensaje de error[cite: 4]
    } finally {
      setCargando(false); // Regresa cargando a false[cite: 4]
    }
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #444', borderRadius: '8px' }}>
      <h2 style={{ color: '#fff' }}>Análisis de Series de Tiempo (API Externa)</h2>
      
      {/* Botón que dispara la petición a la API[cite: 4] */}
      <button 
        onClick={dispararPeticion}
        disabled={cargando}
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Obtener Predicción Climática
      </button>

      <div style={{ marginTop: '1.5rem' }}>
        {/* Si cargando es true, muestra un indicador visual[cite: 4] */}
        {cargando && <p style={{ color: '#88ccff', fontWeight: 'bold' }}>Analizando datos...</p>}
        
        {/* Si hay un error, muestra un mensaje de alerta en color rojo[cite: 4] */}
        {error && <p style={{ color: '#ff4444', fontWeight: 'bold', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '4px' }}>Error: {error}</p>}
        
        {/* Si hay datos, renderízalos utilizando la tabla de la práctica 3.2[cite: 4] */}
        {datos && !cargando && !error && (
          <TablaDatos datos={datos} />
        )}
      </div>
    </div>
  );
}