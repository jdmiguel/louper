import { ReactElement } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/* atoms */
import Avatar from '@mui/material/Avatar';
import TextTag from '../atoms/TextTag';
import Link from '../atoms/Link';

/* types */
import { Repo, RelatedUser } from '../../utils/types';

const Root = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  padding: 20,
}));

const Title = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  marginBottom: 4,
  '& path': { fill: theme.palette.secondary.main },
}));

const AvatarWrapper = styled('div')({
  height: 80,
  marginRight: 20,
  position: 'relative',
  width: 80,
});

const Topic = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 4,
  color: theme.palette.secondary.contrastText,
  padding: '4px 8px',
  marginBottom: 5,
  marginRight: 5,
}));

const Action = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.secondary.light}`,
  marginTop: 14,
  paddingTop: 10,
}));

const displayRepoContent = (data: Repo): ReactElement => (
  <Stack justifyContent="space-between" sx={{ height: '100%' }}>
    <Stack>
      <Title>
        <TextTag content={data.name} withIcon iconType={'folder'} />
      </Title>
      {data.description ? (
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          {data.description}
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ marginTop: 1, color: 'text.disabled' }}>
          No description added
        </Typography>
      )}
      <Stack direction="row" sx={{ flexWrap: 'wrap', marginTop: 1.75 }}>
        {data.topics?.length > 0 ? (
          data.topics.map((topic: string) => (
            <Topic key={topic}>
              <Typography variant="overline">{topic}</Typography>
            </Topic>
          ))
        ) : (
          <Topic>
            <Typography variant="overline">NO TOPICS</Typography>
          </Topic>
        )}
      </Stack>
    </Stack>
    <Action>
      <Link
        url={data.html_url}
        ariaLabel={`View ${data.name} repository on GitHub`}
        content="VISIT REPO"
        withIcon
        iconType="folder_open"
      />
    </Action>
  </Stack>
);

const displayUserContent = (user: RelatedUser): ReactElement => (
  <Stack direction="row">
    <AvatarWrapper>
      <Avatar variant="rounded" sx={{ height: 80, width: 80, position: 'absolute' }} />
      <Avatar
        alt="user following avatar"
        variant="rounded"
        src={user.avatar_url}
        sx={{ height: 80, width: 80, position: 'absolute' }}
      />
    </AvatarWrapper>
    <Stack justifyContent="center">
      <Title>
        <TextTag content={user.login} withIcon iconType="favorite" />
      </Title>
      <Link
        url={user.html_url}
        ariaLabel={`View ${user.login} profile on GitHub`}
        content="VISIT PROFILE"
        withIcon
        iconType="person"
      />
    </Stack>
  </Stack>
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
