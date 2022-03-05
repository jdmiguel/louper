import { ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextTag from '../atoms/TextTag';
import Link from '../atoms/Link';
import { Repo, User, SectionType } from '../../utils/types';

const Root = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  padding: 20,
  overflow: 'hidden',
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
  color: theme.palette.primary.contrastText,
  marginBottom: 5,
  marginRight: 5,
  padding: '4px 8px',
  opacity: 0.5,
}));

const Action = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.secondary.light}`,
  marginTop: 14,
  paddingTop: 10,
}));

const displayRepoContent = (repo: Repo): ReactElement => (
  <Stack justifyContent="space-between" sx={{ height: '100%' }} data-testid="repoContent">
    <Stack>
      <Title>
        <TextTag content={repo.name} withIcon iconType={'folder'} />
      </Title>
      {repo.description ? (
        <Typography
          variant="body1"
          sx={{
            marginTop: 1,
            color: 'text.primary',
            maxWidth: '350px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {repo.description}
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ marginTop: 1, color: 'neutral.light' }}>
          No description added
        </Typography>
      )}
      <Stack direction="row" sx={{ flexWrap: 'wrap', marginTop: 1.75 }}>
        {repo.topics?.length > 0 ? (
          repo.topics.map((topic: string) => (
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
        url={repo.html_url}
        ariaLabel={`View ${repo.name} repository on GitHub`}
        content="VISIT REPO"
        withIcon
        iconType="folder_open"
      />
    </Action>
  </Stack>
);

const displayUserContent = (user: User, theme: SectionType): ReactElement => {
  const iconType = theme === 'following' ? 'visibility' : 'favorite';

  return (
    <Stack direction="row" data-testid="userContent">
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
          <TextTag content={user.login} withIcon iconType={iconType} />
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
};

type Props = {
  theme: SectionType;
  data: Repo | User;
};

const UserCard = ({ theme, data }: Props) => {
  const isRepoTheme = theme === 'repos';
  const repo = data as Repo;
  const user = data as User;

  return <Root>{isRepoTheme ? displayRepoContent(repo) : displayUserContent(user, theme)}</Root>;
};

export default UserCard;
