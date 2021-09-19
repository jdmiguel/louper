/* atoms */
import GithubIcon from '../../atoms/GithubIcon';

/* material-ui */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '50px',
  },
  subtitle: {
    marginTop: '38px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (min-width: 768px)': {
      marginTop: '48px',
    },
  },
  animation: '$greet 560ms ease-in-out',
  icon: {
    '& svg': {
      width: 44,
      marginLeft: 12,
      '& path': {
        fill: theme.palette.secondary.contrastText,
        '&:first-of-type': {
          animation: '$greet 560ms ease-in-out',
        },
      },
      '@media (min-width: 768px)': {
        width: 64,
        marginLeft: 12,
      },
    },
  },
}));

const Heading = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Typography variant="h1">Github</Typography>
      <div className={classes.subtitle}>
        <Typography variant="h2">Finder</Typography>
        <div className={classes.icon}>
          <GithubIcon />
        </div>
      </div>
    </div>
  );
};

export default Heading;
