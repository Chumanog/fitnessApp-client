import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create root using createRoot
const root = ReactDOM.createRoot(document.getElementById('root')); 

// Render the app using the new root API
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);