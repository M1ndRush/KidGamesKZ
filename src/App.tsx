import React from 'react';

function App() {
  return <div style={{ color: 'red', fontSize: 40 }}>
    Тестовый контент - {new Date().toLocaleString()}
    <br />
    Проверка деплоя в gh-pages
  </div>;
}

export default App;