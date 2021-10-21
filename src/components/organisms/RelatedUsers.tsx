import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import Placeholder from '../atoms/Placeholder';

/* molecules */
import Card from '../molecules/Card';

/* types */
import { RelatedUser } from '../../utils/types';

/* styles */
import { EmptyMsg } from './styles';

type Props = {
  total: number;
  userName: string;
  relatedUsers: RelatedUser[];
  relatedUserRequest: (userName: string) => Promise<RelatedUser[]>;
  onFetchRelatedUsers: (followers: RelatedUser[]) => void;
};

const RelatedUserSection = ({
  total,
  userName,
  relatedUserRequest: fetchRelatedUsers,
  relatedUsers,
  onFetchRelatedUsers,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (relatedUsers.length > 0) {
      return;
    }

    setIsLoading(true);

    fetchRelatedUsers(userName)
      .then((relatedUsers) => {
        setIsLoading(false);
        onFetchRelatedUsers(relatedUsers);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (total === 0) {
    return (
      <EmptyMsg>
        <Typography variant="h6">No following added</Typography>
      </EmptyMsg>
    );
  }

  if (isLoading) {
    const placeholderList = new Array(total);
    placeholderList.fill('');

    return (
      <>
        {placeholderList.map(() => (
          <Placeholder key={uuidv4()} withUserTheme />
        ))}
      </>
    );
  }

  return (
    <>
      {relatedUsers.map((relatedUser) => (
        <Card key={relatedUser.login} theme="USER" data={relatedUser} />
      ))}
    </>
  );
};

export default RelatedUserSection;
