export default function TablaDatos({ datos }) {
  if (!datos || datos.length === 0) return <p>Cargando datos...</p>;

  return (
    <table style={{ width: '100%', marginTop: '2rem', borderCollapse: 'collapse', color: '#fff' }}>
      <thead>
        <tr style={{ backgroundColor: '#333' }}>
          <th style={{ padding: '10px', border: '1px solid #555' }}>Etiqueta</th>
          <th style={{ padding: '10px', border: '1px solid #555' }}>Precisión</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((fila, index) => (
          <tr key={index} style={{ backgroundColor: '#222' }}>
            <td style={{ padding: '10px', border: '1px solid #555', textAlign: 'center' }}>{fila.etiqueta}</td>
            <td style={{ padding: '10px', border: '1px solid #555', textAlign: 'center' }}>{fila.valorNumerico}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}