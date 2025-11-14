import { ReactElement, forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextTag from '@/components/shared/TextTag';
import { UNAVAILABLE_ITEMS, ICON_TYPE, USER_ITEMS_TYPE } from '@/utils/literals';
import { Repo, SimplifiedUser, UserItemsType } from '@/utils/types';
import { StyledRoot, StyledTitle, StyledAvatarWrapper } from './styles';

const displayRepoTheme = (repo: Repo): ReactElement => (
  <Stack sx={{ height: '100%' }} data-testid="repoContent">
    <StyledTitle>
      <TextTag content={repo.name} withUppercase withIcon iconType={ICON_TYPE.repo} />
    </StyledTitle>
    {repo.description ? (
      <Typography
        variant="body1"
        sx={{
          marginTop: 1,
          color: 'text.secondary',
          maxWidth: '350px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {repo.description}
      </Typography>
    ) : (
      <Typography variant="body1" sx={{ marginTop: 1, color: 'neutral.main' }}>
        {UNAVAILABLE_ITEMS.description}
      </Typography>
    )}
  </Stack>
);

const displayUserTheme = (user: SimplifiedUser, theme: UserItemsType): ReactElement => {
  return (
    <Stack direction="row" data-testid="userContent">
      <StyledAvatarWrapper>
        <Avatar variant="circular" sx={{ height: 60, width: 60, position: 'absolute' }} />
        <Avatar
          alt={`user ${theme} avatar`}
          variant="circular"
          src={user.avatar_url}
          sx={{ height: 60, width: 60, position: 'absolute' }}
        />
      </StyledAvatarWrapper>
      <StyledTitle>
        <TextTag content={user.login} withUppercase />
      </StyledTitle>
    </Stack>
  );
};

type Props = {
  theme: UserItemsType;
  data: Repo | SimplifiedUser;
};

const SectionItem = forwardRef<HTMLAnchorElement, Props>(({ theme, data }, ref) => {
  const isRepoTheme = theme === USER_ITEMS_TYPE.repos;
  const repo = data as Repo;
  const user = data as SimplifiedUser;

  const href = isRepoTheme ? repo.html_url : user.html_url;

  return (
    <StyledRoot ref={ref} href={href}>
      {isRepoTheme ? displayRepoTheme(repo) : displayUserTheme(user, theme)}
    </StyledRoot>
  );
});

export default SectionItem;
