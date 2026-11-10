import { useState, useEffect } from 'react';
import Navbar from './components/Navbar'; // De la práctica anterior
import TarjetaMetrica from './components/TarjetaMetrica';
import TablaDatos from './components/TablaDatos';
import PanelAnalitico from './components/PanelAnalitico'; // <-- Importación agregada
import { obtenerDatosVisualizacion, procesarDatos } from './services/dataService';

function App() {
  // Almacena el dataset original y el procesado usando useState
  const [datosCrudos, setDatosCrudos] = useState([]);
  const [datosProcesados, setDatosProcesados] = useState([]);

  // Ejecuta obtenerDatosVisualizacion() al montar la aplicación con useEffect
  useEffect(() => {
    const cargarDatos = async () => {
      const data = await obtenerDatosVisualizacion();
      setDatosCrudos(data);
      
      const procesados = procesarDatos(data);
      setDatosProcesados(procesados);
    };
    
    cargarDatos();
  }, []);

  // Calculando métricas clave para las tarjetas
  const promedioPrecision = datosCrudos.length 
    ? (datosCrudos.reduce((acc, curr) => acc + curr.precision, 0) / datosCrudos.length * 100).toFixed(2) + '%'
    : '0%';
  const mejorModelo = datosCrudos.length 
    ? datosCrudos.reduce((prev, current) => (prev.precision > current.precision) ? prev : current).etiqueta
    : '-';

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', paddingBottom: '2rem' }}>
      <Navbar />
      
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        {/* Renderiza al menos tres instancias de TarjetaMetrica */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <TarjetaMetrica titulo="Total Modelos" valor={datosCrudos.length} />
          <TarjetaMetrica titulo="Precisión Promedio" valor={promedioPrecision} />
          <TarjetaMetrica titulo="Mejor Modelo" valor={mejorModelo} />
        </div>

        {/* Instancia de TablaDatos inyectando la información del estado */}
        <TablaDatos datos={datosProcesados} />

        {/* Instancia de PanelAnalitico inyectada para la API externa */}
        <PanelAnalitico />
      </main>
    </div>
  );
}

export default App;