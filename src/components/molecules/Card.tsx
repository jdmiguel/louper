import { ReactElement } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/* atoms */
import Avatar from '@mui/material/Avatar';
import TextTag from '../atoms/TextTag';
import Link from '../atoms/Link';

/* types */
import { Repo, User, CardSize, SectionType } from '../../utils/types';

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

const StyledButton = styled(Button)(({ theme }) => ({
  height: 44,
  minWidth: 180,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const AvatarWrapper = styled('div')<{
  size?: CardSize;
}>(({ size }) => ({
  height: size === 'SMALL' ? 32 : 80,
  marginRight: size === 'SMALL' ? 10 : 20,
  position: 'relative',
  width: size === 'SMALL' ? 32 : 80,
}));

const Topic = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.light,
  borderRadius: 4,
  padding: '4px 8px',
  marginBottom: 5,
  marginRight: 5,
}));

const Action = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.secondary.light}`,
  marginTop: 14,
  paddingTop: 10,
}));

const displayRepoContent = (repo: Repo): ReactElement => (
  <Stack justifyContent="space-between" sx={{ height: '100%' }}>
    <Stack>
      <Title>
        <TextTag content={repo.name} withIcon iconType={'folder'} />
      </Title>
      {repo.description ? (
        <Typography variant="body1" sx={{ marginTop: 1, color: 'text.secondary' }}>
          {repo.description}
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ marginTop: 1, color: 'text.disabled' }}>
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
  const iconType = theme === 'FOLLOWING' ? 'visibility' : 'favorite';

  return (
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
  theme?: SectionType;
  data: Repo | User;
  size?: CardSize;
  onClick?: (userName: string) => void;
};

const Card = ({ theme = 'FOLLOWING', data, size = 'NORMAL', onClick }: Props) => {
  const isRepoTheme = theme === 'REPOS';
  const repo = data as Repo;
  const user = data as User;

  if (size === 'SMALL') {
    return (
      <StyledButton variant="contained" onClick={() => onClick?.(user.login)}>
        <Stack direction="row" sx={{ alignItems: 'center', width: '100%' }}>
          <AvatarWrapper size={size}>
            <Avatar variant="circular" sx={{ height: 32, width: 32, position: 'absolute' }} />
            <Avatar
              alt="user following avatar"
              variant="circular"
              src={user.avatar_url}
              sx={{ height: 32, width: 32, position: 'absolute' }}
            />
          </AvatarWrapper>
          <Typography
            variant="h5"
            sx={{
              maxWidth: 100,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user.login}
          </Typography>
        </Stack>
      </StyledButton>
    );
  }

  return <Root>{isRepoTheme ? displayRepoContent(repo) : displayUserContent(user, theme)}</Root>;
};

export default Card;
