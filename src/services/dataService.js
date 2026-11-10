import dataset from '../dataset.json';

// Simula una petición HTTP devolviendo una Promesa con el JSON local
export const obtenerDatosVisualizacion = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataset);
    }, 500); // Simulando retardo de red
  });
};

// Filtra o formatea la información preparándola para el renderizado
export const procesarDatos = (datos) => {
  return datos.map(item => ({
    etiqueta: item.etiqueta.toUpperCase(),
    valorNumerico: (item.precision * 100).toFixed(2) + '%'
  }));
};


import apiClient from './apiClient';
// ... (conserva las funciones de la práctica 2 arriba)

export const obtenerSerieDeTiempo = async (parametros) => {
  // Realiza la petición GET a la API externa enviando los parámetros
  const response = await apiClient.get('/forecast', { params: parametros });
  
  // Extrae la carga útil (payload) de la respuesta[cite: 3]
  const datosHorarios = response.data.hourly;
  
  // Retorna los datos limpios al componente preparándolos para la TablaDatos[cite: 3]
  // Tomaremos solo los primeros 5 registros para el ejemplo
  const datosLimpios = datosHorarios.time.slice(0, 5).map((tiempo, index) => ({
    etiqueta: tiempo.replace('T', ' '), 
    valorNumerico: datosHorarios.temperature_2m[index] + ' °C'
  }));

  return datosLimpios;
};