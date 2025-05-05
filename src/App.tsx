import React from 'react';

function App() {
  return <div style={{ color: 'red', fontSize: 40 }}>
    Тестовый контент - {new Date().toLocaleString()}
  </div>;
}

export default App;