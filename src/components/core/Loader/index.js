import React from 'react';

/* material-ui */
import CircularProgress from '@material-ui/core/CircularProgress';

/* styles */
import './styles.css';

const Loader = () => (
  <div className="loader">
    <CircularProgress
      className="loaderIcon"
      color="secondary"
      size={50}
      thickness={5}
    />
  </div>
);

export default Loader;
