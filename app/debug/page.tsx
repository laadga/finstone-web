export default function DebugPage() {
  return (
    <html>
      <head>
        <title>Debug Page</title>
      </head>
      <body style={{ margin: 0, padding: 20, backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#333', fontSize: '32px' }}>🔧 Debug Page</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>If you can see this, the server is working!</p>
        <div style={{ marginTop: '20px' }}>
          <p><strong>Current Time:</strong> {new Date().toLocaleString()}</p>
          <p><strong>Server Port:</strong> 3004</p>
          <p><strong>Page Route:</strong> /debug</p>
        </div>
        <div style={{ marginTop: '30px' }}>
          <a href="/" style={{ display: 'inline-block', backgroundColor: '#007bff', color: 'white', padding: '10px 20px', textDecoration: 'none', marginRight: '10px' }}>Main Page</a>
          <a href="/minimal" style={{ display: 'inline-block', backgroundColor: '#28a745', color: 'white', padding: '10px 20px', textDecoration: 'none', marginRight: '10px' }}>Minimal Page</a>
          <a href="/crm" style={{ display: 'inline-block', backgroundColor: '#6f42c1', color: 'white', padding: '10px 20px', textDecoration: 'none' }}>CRM</a>
        </div>
      </body>
    </html>
  );
}
