import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import { SocketContextProvider } from './context/SocketContext';
import { SelectTextContextProvider } from './context/SelectedTextContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <SelectTextContextProvider>
          <App />
        </SelectTextContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
