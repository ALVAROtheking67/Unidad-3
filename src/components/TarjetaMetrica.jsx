export default function TarjetaMetrica({ titulo, valor }) {
  return (
    <div style={{
      padding: '1rem',
      margin: '0.5rem',
      backgroundColor: '#2a2a2a',
      color: '#fff',
      borderRadius: '8px',
      minWidth: '200px',
      textAlign: 'center',
      border: '1px solid #444'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#88ccff' }}>{titulo}</h3>
      <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>{valor}</p>
    </div>
  );
}