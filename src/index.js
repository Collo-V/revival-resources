import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/App.css';
import './assets/styles/index.css';
import './assets/styles/tailwind.css'
import 'animate.css'
import App from './App';
import {Provider} from 'react-redux'
import {store} from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);

