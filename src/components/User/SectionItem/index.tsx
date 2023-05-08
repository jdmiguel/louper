import { ReactElement } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextTag from '@/components/shared/TextTag';
import Link from '@/components/shared/Link';
import { UNAVAILABLE_ITEMS, LINK_TEXT, ICON_TYPE, SECTION_TYPE } from '@/utils/literals';
import { Repo, User, SectionType } from '@/utils/types';
import { StyledRoot, StyledTitle, StyledAvatarWrapper, StyledTopic, StyledAction } from './styles';

const displayRepoTheme = (repo: Repo): ReactElement => (
  <Stack justifyContent="space-between" sx={{ height: '100%' }} data-testid="repoContent">
    <Stack>
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
        <Typography variant="h6" sx={{ marginTop: 1, color: 'neutral.main' }}>
          {UNAVAILABLE_ITEMS.description}
        </Typography>
      )}
      <Stack direction="row" sx={{ flexWrap: 'wrap', marginTop: 1.75 }}>
        {repo.topics?.length > 0 ? (
          repo.topics.map((topic: string) => (
            <StyledTopic key={topic}>
              <Typography variant="overline">{topic}</Typography>
            </StyledTopic>
          ))
        ) : (
          <StyledTopic>
            <Typography variant="overline">{UNAVAILABLE_ITEMS.topics}</Typography>
          </StyledTopic>
        )}
      </Stack>
    </Stack>
    <StyledAction>
      <Link
        url={repo.html_url}
        ariaLabel={`View ${repo.name} repository on GitHub`}
        content={LINK_TEXT.repo}
        withIcon
        iconType={ICON_TYPE.repoItem}
      />
    </StyledAction>
  </Stack>
);

const displayUserTheme = (user: User, theme: SectionType): ReactElement => {
  const iconType = theme === SECTION_TYPE.following ? ICON_TYPE.following : ICON_TYPE.followers;

  return (
    <Stack direction="row" data-testid="userContent">
      <StyledAvatarWrapper>
        <Avatar variant="rounded" sx={{ height: 80, width: 80, position: 'absolute' }} />
        <Avatar
          alt={`user ${theme} avatar`}
          variant="rounded"
          src={user.avatar_url}
          sx={{ height: 80, width: 80, position: 'absolute' }}
        />
      </StyledAvatarWrapper>
      <Stack justifyContent="center">
        <StyledTitle>
          <TextTag content={user.login} withUppercase withIcon iconType={iconType} />
        </StyledTitle>
        <Link
          url={user.html_url}
          ariaLabel={`View ${user.login} profile on GitHub`}
          content={LINK_TEXT.profile}
          withIcon
          iconType={ICON_TYPE.profile}
        />
      </Stack>
    </Stack>
  );
};

type Props = {
  theme: SectionType;
  data: Repo | User;
};

const SectionItem = ({ theme, data }: Props) => {
  const isRepoTheme = theme === SECTION_TYPE.repos;
  const repo = data as Repo;
  const user = data as User;

  return (
    <StyledRoot>{isRepoTheme ? displayRepoTheme(repo) : displayUserTheme(user, theme)}</StyledRoot>
  );
};

export default SectionItem;
