/* material-ui */
import CircularProgress from '@material-ui/core/CircularProgress';

/* styles */
import './styles.css';

const Loader = () => (
  <div className="loader">
    <CircularProgress className="loaderIcon" size={50} thickness={5} />
  </div>
);

export default Loader;
