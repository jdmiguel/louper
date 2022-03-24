import ReactDOM from 'react-dom';
import initMockServiceWorker from './mocks/mockServiceWorker';
import App from './components/App';

initMockServiceWorker();

ReactDOM.render(<App />, document.getElementById('root'));
