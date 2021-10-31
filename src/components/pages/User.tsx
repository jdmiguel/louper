import { useState, useEffect, useMemo, useCallback } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

/* molecules */
import Menu from '../molecules/Menu';
import Toast from '../molecules/Toast';

/* organisms */
import Profile from '../organisms/Profile';
import ProfileMobile from '../organisms/ProfileMobile';
import UserSection from '../organisms/UserSection';

/* services */
import {
  abortControllerRepos,
  fetchRepos,
  abortControllerFollowers,
  fetchFollowing,
  abortControllerFollowing,
  fetchFollowers,
} from '../../utils/services';

/* types */
import { User, Repo, RelatedUser } from '../../utils/types';

const Root = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '0 20px 50px',
  '@media (min-width: 769px)': {
    padding: '0 30px 50px',
  },
});

const ProfileWrapper = styled('aside')({
  margin: '60px 40px 0 0',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const SectionWrapper = styled('main')({
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

const requestSettings = {
  repos: {
    fetchRequest: fetchRepos,
    abortController: abortControllerRepos,
  },
  following: {
    fetchRequest: fetchFollowing,
    abortController: abortControllerFollowing,
  },
  followers: {
    fetchRequest: fetchFollowers,
    abortController: abortControllerFollowers,
  },
};

type Props = {
  user: User;
  onBackFinder: () => void;
};

const UserPage = ({ user, onBackFinder }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [activeSection, setActiveUserSection] = useState(0);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [following, setFollowing] = useState<RelatedUser[]>([]);
  const [followers, setFollowers] = useState<RelatedUser[]>([]);

  const isRequestAllowed = useMemo(
    () =>
      (activeSection === 0 && repos.length > 0) ||
      (activeSection === 1 && following.length > 0) ||
      (activeSection === 2 && followers.length > 0),
    [activeSection, repos, following, followers],
  );

  const getRequestSettings = useCallback(() => {
    switch (activeSection) {
      case 0:
      default:
        return requestSettings.repos;
      case 1:
        return requestSettings.following;
      case 2:
        return requestSettings.followers;
    }
  }, [activeSection]);

  const selectItemsSetter = useCallback(() => {
    switch (activeSection) {
      case 0:
      default:
        return setRepos;
      case 1:
        return setFollowing;
      case 2:
        return setFollowers;
    }
  }, [activeSection]);

  useEffect(() => {
    if (isRequestAllowed) {
      return;
    }

    setIsLoading(true);

    const setItems = selectItemsSetter();
    const { fetchRequest, abortController } = getRequestSettings();

    fetchRequest(user.login)
      .then((items) => {
        setItems(items);
      })
      .catch(() => {
        setIsErrorToastOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [selectItemsSetter, getRequestSettings, isRequestAllowed, user.login]);

  return (
    <Root>
      <ProfileWrapper>
        <Profile user={user} />
      </ProfileWrapper>
      <Stack
        sx={{
          '@media (max-width: 992px)': {
            width: '100%',
          },
        }}
      >
        <ProfileMobile user={user} />
        <Menu
          onClick={(section: number) => {
            setActiveUserSection(section);
            if (section === 3) {
              onBackFinder();
            }
          }}
        />
        <SectionWrapper>
          {activeSection === 0 && (
            <UserSection
              type="REPO"
              total={user.public_repos}
              isLoading={isLoading}
              items={repos}
              emptyMsg="No repos added"
            />
          )}
          {activeSection === 1 && (
            <UserSection
              type="RELATED_USER"
              total={user.following}
              isLoading={isLoading}
              items={following}
              emptyMsg="No following added"
            />
          )}
          {activeSection === 2 && (
            <UserSection
              type="RELATED_USER"
              total={user.followers}
              isLoading={isLoading}
              items={followers}
              emptyMsg="No followers added"
            />
          )}
        </SectionWrapper>
      </Stack>
      <Toast
        isOpen={isErrorToastOpen}
        type="error"
        msg="Sorry! there was an error on the server side."
        onClose={() => setIsErrorToastOpen(false)}
      />
    </Root>
  );
};

export default UserPage;
