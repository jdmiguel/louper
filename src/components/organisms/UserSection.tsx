import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/* atoms */
import Placeholder from '../atoms/Placeholder';

/* molecules */
import Card from '../molecules/Card';

/* types */
import { SectionType, Repo, User } from '../../utils/types';

const Root = styled('main')({
  display: 'grid',
  gridGap: 20,
  marginTop: 30,
  padding: 1,
  '@media (min-width: 992px)': {
    gridTemplateColumns: 'repeat(2, 330px)',
  },
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 420px)',
  },
});

const EmptyMsg = styled('div')({
  display: 'flex',
  marginTop: 8,
});

type Item = Repo | User;
type Props = {
  type: SectionType;
  isLoading: boolean;
  items: Item[];
  totalItems: number;
  emptyMsg: string;
};

const UserSection = ({ type, isLoading, items, totalItems, emptyMsg }: Props) => {
  if (totalItems === 0) {
    return (
      <EmptyMsg>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {emptyMsg}
        </Typography>
      </EmptyMsg>
    );
  }

  if (isLoading) {
    const placeholderList = new Array(totalItems);
    placeholderList.fill('');

    return (
      <Root>
        {placeholderList.map(() => (
          <Placeholder key={uuidv4()} withUserTheme={type !== 'REPOS'} />
        ))}
      </Root>
    );
  }

  return (
    <Root>
      {items.map((item) => (
        <Card key={item.id} theme={type} data={item} />
      ))}
    </Root>
  );
};

export default UserSection;
