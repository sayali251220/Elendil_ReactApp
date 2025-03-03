import React from 'react';
import './App.css';
import Login from './Login'; // ✅ Make sure Login.js exists inside `src/`

function App() {
  return (
    <div className="App">
      <h1>Welcome to Elendil React App</h1>
      <Login /> {/* ✅ This will display the login form */}
    </div>
  );
}

export default App; // ✅ Ensure this export is present
