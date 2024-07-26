import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import { SocketContextProvider } from './context/SocketContext';
// import { SocketProvider } from "./socketContext/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        {/* <SocketProvider> */}
          <App />
        {/* </SocketProvider> */}
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
