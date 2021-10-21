import { ReactElement } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/* atoms */
import Avatar from '@mui/material/Avatar';
import Label from '../atoms/Label';
import Link from '../atoms/Link';

/* types */
import { Repo, RelatedUser } from '../../utils/types';

const Root = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  padding: 20,
}));

const CardTitle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  marginBottom: 4,
  '& path': { fill: theme.palette.secondary.main },
}));

const CardTopics = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 14,
  marginBottom: 12,
});

const CardTopic = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 4,
  color: theme.palette.secondary.light,
  padding: '4px 8px',
  marginBottom: 5,
  marginRight: 5,
}));

const CardAction = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.secondary.light}`,
  marginTop: 10,
  paddingTop: 10,
}));

const RepoContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const UserContent = styled('div')({
  display: 'flex',
});

const UserText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const displayRepoContent = <T extends Repo>(data: T): ReactElement => (
  <RepoContent>
    <CardTitle>
      <Label content={data.name} withIcon iconType={'folder'} />
    </CardTitle>
    {data.description ? (
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        {data.description}
      </Typography>
    ) : (
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        No description added
      </Typography>
    )}
    <CardTopics>
      {data.topics?.length > 0 ? (
        data.topics.map((topic: string) => (
          <CardTopic key={topic}>
            <Typography variant="overline">{topic}</Typography>
          </CardTopic>
        ))
      ) : (
        <CardTopic>
          <Typography variant="overline">NO TOPICS</Typography>
        </CardTopic>
      )}
    </CardTopics>
    <CardAction>
      <Link
        url={data.html_url}
        ariaLabel={`View ${data.name} repository on GitHub`}
        content="VISIT REPO"
        withIcon
        iconType="folder_open"
      />
    </CardAction>
  </RepoContent>
);

const displayUserContent = <T extends RelatedUser>(user: T): ReactElement => (
  <UserContent>
    <Avatar
      alt="user following avatar"
      src={user.avatar_url}
      sx={{ width: 80, height: 80, marginRight: 2 }}
    />
    <UserText>
      <CardTitle>
        <Label content={user.login} withIcon iconType="favorite" />
      </CardTitle>
      <Link
        url={user.html_url}
        ariaLabel={`View ${user.login} profile on GitHub`}
        content="VISIT PROFILE"
        withIcon
        iconType="person"
      />
    </UserText>
  </UserContent>
);

type Props = {
  theme: 'REPO' | 'USER';
  data: Repo | RelatedUser;
};

const Card = ({ theme, data }: Props) => {
  const isRepoTheme = theme === 'REPO';

  return (
    <Root>
      {isRepoTheme ? displayRepoContent(data as Repo) : displayUserContent(data as RelatedUser)}
    </Root>
  );
};

export default Card;