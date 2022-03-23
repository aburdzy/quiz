import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import settingsReducer from './features/Settings';
import resultReducer from './features/Result';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    result: resultReducer
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
