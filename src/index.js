import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // ✅ Make sure App.js exists

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />  {/* ✅ This makes sure App.js is running */}
  </React.StrictMode>
);
