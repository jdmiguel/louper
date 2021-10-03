/* material-ui */
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => (
  <div className="loader">
    <CircularProgress className="loaderIcon" size={50} thickness={5} />
  </div>
);

export default Loader;
