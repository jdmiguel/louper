/* material-ui */
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 2,
    height: 'auto',
    width: '100%',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 16px 16px',
  },
  link: {
    fontWeight: 700,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.wrapper}>
      <div className={classes.content}>
        <Typography variant="body2">
          COPYRIGHT @2021 | Created by{' '}
          <Link
            className={classes.link}
            href="https://jdmiguel.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
          >
            jdmiguel
          </Link>
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
