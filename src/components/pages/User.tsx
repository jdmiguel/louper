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

/* request */
import { ResponseError, BASE_URL, handleErrors } from '../../utils/request';

/* types */
import { UserData, Repo, User, SectionType } from '../../utils/types';

const Root = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '0 20px 50px',
  '@media (min-width: 768px)': {
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

type Props = {
  userData: UserData;
  onBackFinder: () => void;
};

const UserPage = ({ userData, onBackFinder }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [activeSection, setActiveUserSection] = useState(0);
  const [typeSection, setTypeSection] = useState<SectionType>('REPOS');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);

  const isRequestAllowed = useMemo(
    () =>
      (activeSection === 0 && repos.length > 0) ||
      (activeSection === 1 && following.length > 0) ||
      (activeSection === 2 && followers.length > 0),
    [activeSection, repos, following, followers],
  );

  const selectItemsSetter = useCallback(() => {
    switch (activeSection) {
      case 0:
      default:
        setTypeSection('REPOS');
        return setRepos;
      case 1:
        setTypeSection('FOLLOWING');
        return setFollowing;
      case 2:
        setTypeSection('FOLLOWERS');
        return setFollowers;
    }
  }, [activeSection]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const abortController = useMemo(() => new AbortController(), [activeSection]);

  const getRequest = useCallback(
    (userName: string) => {
      switch (activeSection) {
        case 0:
        default:
          return fetch(`${BASE_URL}/users/${userName}/repos`, {
            signal: abortController.signal,
          }).then(handleErrors);
        case 1:
          return fetch(`${BASE_URL}/users/${userName}/following`, {
            signal: abortController.signal,
          }).then(handleErrors);
        case 2:
          return fetch(`${BASE_URL}/users/${userName}/followers`, {
            signal: abortController.signal,
          }).then(handleErrors);
      }
    },
    [activeSection, abortController],
  );

  useEffect(() => {
    if (isRequestAllowed) {
      return;
    }

    setIsLoading(true);

    const setItems = selectItemsSetter();

    getRequest(userData.login)
      .then((items) => {
        setItems(items);
      })
      .catch((error: ResponseError) => {
        if (error.code === 20) {
          return;
        }
        setIsErrorToastOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [getRequest, selectItemsSetter, isRequestAllowed, userData.login, abortController]);

  return (
    <Root>
      <ProfileWrapper>
        <Profile userData={userData} />
      </ProfileWrapper>
      <Stack
        sx={{
          '@media (max-width: 992px)': {
            width: '100%',
          },
        }}
      >
        <ProfileMobile userData={userData} />
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
              type={typeSection}
              total={userData.public_repos}
              isLoading={isLoading}
              items={repos}
              emptyMsg="No repos added"
            />
          )}
          {activeSection === 1 && (
            <UserSection
              type={typeSection}
              total={userData.following}
              isLoading={isLoading}
              items={following}
              emptyMsg="No following added"
            />
          )}
          {activeSection === 2 && (
            <UserSection
              type={typeSection}
              total={userData.followers}
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
