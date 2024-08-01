import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './app/store.js';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';



const clientId = "994587633443-94o6akdpmrbcrjbg1jcnc9n555r2kn8n.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
);