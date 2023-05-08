import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const StyledRoot = styled('header')({
  position: 'sticky',
  top: 0,
  zIndex: 1,
});

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  borderBottom: `1px solid ${theme.palette.neutral.dark}`,
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between',
    '@media (min-width: 1200x)': {
      justifyContent: 'center',
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 2,
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minWidth: 60,
  '@media (min-width: 992px)': {
    minWidth: 120,
  },
  '@media (min-width: 1200px)': {
    minWidth: 200,
  },
  '& .MuiSvgIcon-root': {
    fill: theme.palette.primary.main,
    marginBottom: '2px !important',
    transition: 'fill ease-out 250ms',
    width: 22,
    '+ span': {
      color: theme.palette.primary.main,
      display: 'none',
      fontSize: '1rem',
      fontWeight: 700,
      transition: 'color ease-out 250ms',
      '@media (min-width: 992px)': {
        display: 'initial',
      },
    },
  },
  '&:hover': {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.light,
      '+ span': { color: theme.palette.primary.light },
    },
  },
}));
