import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { SectionType } from '../../utils/types';

const Root = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 20,
  opacity: 0.35,
}));

type Props = {
  sectionType: SectionType;
};

const Placeholder = ({ sectionType }: Props) => (
  <Root sx={{ height: sectionType === 'REPOS' ? 199 : 122 }}>
    <LinearProgress color="secondary" />
    <LinearProgress color="secondary" />
    <LinearProgress color="secondary" />
    <LinearProgress color="secondary" />
  </Root>
);

export default Placeholder;
