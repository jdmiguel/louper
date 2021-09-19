/* material-ui */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 16px 12px',
    width: '100%',
    height: '5vh',
    '@media (min-width: 768px)': {
      position: 'absolute',
      left: 0,
      bottom: 0,
      zIndex: 2,
      height: 'auto',
    },
  },
  link: {
    fontWeight: 700,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.wrapper}>
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
    </footer>
  );
};

export default Footer;
