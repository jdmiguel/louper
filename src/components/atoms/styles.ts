/* material-ui */
import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const GithubCornerRoot = styled('a')(({ theme }: { theme: Theme }) => ({
  '& svg': {
    fill: theme.palette.primary.main,
    color: theme.palette.background.default,
    transition: 'fill ease-out 250ms',
  },
  '&:hover': {
    '& svg': {
      fill: theme.palette.primary.light,
    },
    '& path:nth-of-type(2)': {
      animation: `${theme.animation.greet} 560ms ease-in-out`,
    },
  },
  '& path:not(:first-of-type)': {
    fill: theme.palette.background.default,
    transformOrigin: '130px 106px',
  },
}));

const PlaceholderRoot = styled('div')(({ theme }: { theme: Theme }) => ({
  flexDirection: 'column',
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  display: 'flex',
  justifyContent: 'space-between',
  padding: 20,
}));

const PlaceholderShimmer = styled('div')(({ theme }: { theme: Theme }) => ({
  animation: `${theme.animation.shimmer} 2000ms linear infinite`,
  backgroundSize: '1200px 100%',
  backgroundColor: theme.palette.background.default,
  backgroundImage:
    '-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.08)),color-stop(15%,rgba(0,0,0,.15)),color-stop(30%,rgba(0,0,0,.08)))',
  overflow: 'hidden',
  willChange: 'background-position-x',
}));

const PlaceholderRepoContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 8,
});

const PlaceholderRepoLine = styled('span')(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: 14,
  marginBottom: 12,
  width: '100%',
}));

const PlaceholderRepoDivider = styled('span')(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: 30,
  marginBottom: 2,
  width: '100%',
}));

const PlaceholderUserContent = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: '34px 34px',
});

const PlaceholderUserVline = styled('span')(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  gridColumn: '1/2',
  gridRow: '1/4',
  height: '100%',
  marginLeft: 87,
  width: 16,
}));

const PlaceholderUserHline = styled('span')(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  gridColumn: '2/5',
  height: 16,
  width: '100%',
}));

export {
  GithubCornerRoot,
  PlaceholderRoot,
  PlaceholderShimmer,
  PlaceholderRepoContent,
  PlaceholderRepoLine,
  PlaceholderRepoDivider,
  PlaceholderUserContent,
  PlaceholderUserVline,
  PlaceholderUserHline,
};
