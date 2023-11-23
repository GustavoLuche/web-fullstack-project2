import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { AdviceContextProvider } from './context/AdviceContext'; 

// Renderiza o aplicativo dentro do contexto fornecido pelo AdviceContextProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdviceContextProvider>
      <App />
    </AdviceContextProvider>
  </React.StrictMode>
);

reportWebVitals();
