import { styled } from '@mui/material/styles';

export const StyledRoot = styled('a')(({ theme }) => ({
  svg: {
    fill: theme.palette.primary.main,
    color: theme.palette.background.default,
    transition: 'fill ease-out 250ms',
  },
  '&:hover': {
    svg: {
      fill: theme.palette.primary.light,
    },
    '& path:nth-of-type(2)': {
      animation: `${theme.animation.greet} 560ms ease-in-out`,
    },
  },
  '& path:not(:first-of-type)': {
    fill: theme.palette.secondary.dark,
    transformOrigin: '130px 106px',
  },
}));
