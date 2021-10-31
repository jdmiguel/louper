import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/* atoms */
import Placeholder from '../atoms/Placeholder';

/* molecules */
import Card from '../molecules/Card';

/* types */
import { SectionType, Repo, RelatedUser } from '../../utils/types';

const EmptyMsg = styled('div')({
  display: 'flex',
  marginTop: 8,
});

type Item = Repo | RelatedUser;
type Props = {
  type: SectionType;
  total: number;
  isLoading: boolean;
  items: Item[];
  emptyMsg: string;
};

const UserSection = ({ type, total, isLoading, items, emptyMsg }: Props) => {
  const isRepoType = type === 'REPO';

  if (total === 0) {
    return (
      <EmptyMsg>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {emptyMsg}
        </Typography>
      </EmptyMsg>
    );
  }

  if (isLoading) {
    const placeholderList = new Array(total);
    placeholderList.fill('');

    return (
      <>
        {placeholderList.map(() => (
          <Placeholder key={uuidv4()} withUserTheme={!isRepoType} />
        ))}
      </>
    );
  }

  return (
    <>
      {items.map((item) => (
        <Card key={item.id} theme={isRepoType ? 'REPO' : 'USER'} data={item} />
      ))}
    </>
  );
};

export default UserSection;
