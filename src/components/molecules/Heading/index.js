/* atoms */
import GithubIcon from '../../atoms/GithubIcon';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '50px',
});

const Subtitle = styled('div')({
  marginTop: '38px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (min-width: 768px)': {
    marginTop: '48px',
  },
});

const IconWrapper = styled('div')(({ theme }) => ({
  '& svg': {
    width: 44,
    marginLeft: 12,
    '& path': {
      fill: theme.palette.neutral.main,
    },
    '@media (min-width: 768px)': {
      width: 64,
      marginLeft: 12,
    },
  },
}));

const Heading = () => (
  <Root>
    <Typography variant="h1">Github</Typography>
    <Subtitle>
      <Typography variant="h2">Finder</Typography>
      <IconWrapper>
        <GithubIcon />
      </IconWrapper>
    </Subtitle>
  </Root>
);

export default Heading;
