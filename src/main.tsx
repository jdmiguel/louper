import ReactDOM from 'react-dom/client';
import { worker } from './mocks/browser';
import App from './components/App';

if (import.meta.env.MODE === 'mock') {
  console.log('import.meta.env.MODE: ', import.meta.env.MODE);
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
