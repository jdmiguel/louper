import React from 'react';
import ReactDOM from 'react-dom/client';
import initMockServiceWorker from './mocks/mockServiceWorker';
import App from './components/App';

initMockServiceWorker();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
