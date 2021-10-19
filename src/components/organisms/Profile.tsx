/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import GithubIcon from '../atoms/GithubIcon';

/* utils */
import { navigateToUrl } from '../../utils';

/* styles */
import {
  GithubIconWrapper,
  StyledLink,
  ProfileRoot,
  ProfileContent,
  ProfileContentInfo,
  ProfileContentActions,
  ProfileInfoTag,
  ProfileIcon,
  ProfileWebIcon,
} from './styles';

const buildCreationDate = (date: string) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString();

  return formattedDate.slice(0, formattedDate.indexOf(','));
};

const Profile = ({
  data: {
    avatarUrl,
    name,
    login,
    bio,
    email,
    repos,
    followers,
    following,
    createdAt,
    location,
    blog,
    company,
    htmlUrl,
  },
}: any) => (
  <ProfileRoot>
    <img alt="user avatar" src={avatarUrl} />
    <ProfileContent>
      <Typography variant="h3" sx={{ marginBottom: 0.4 }}>
        {name}
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {login}
      </Typography>
      <Typography variant="h5">{bio}</Typography>
      <ProfileContentInfo>
        <ProfileInfoTag>
          <ProfileIcon>folder</ProfileIcon>
          {repos}
        </ProfileInfoTag>
        <ProfileInfoTag>
          <ProfileIcon>visibility</ProfileIcon>
          {following}
        </ProfileInfoTag>
        <ProfileInfoTag>
          <ProfileIcon>favorite</ProfileIcon>
          {followers}
        </ProfileInfoTag>
        {createdAt && (
          <ProfileInfoTag>
            <ProfileIcon>event_note</ProfileIcon>
            {buildCreationDate(createdAt)}
          </ProfileInfoTag>
        )}
        {location && (
          <ProfileInfoTag>
            <ProfileIcon>location_on</ProfileIcon>
            {location}
          </ProfileInfoTag>
        )}
        {company && (
          <ProfileInfoTag>
            <ProfileIcon>business</ProfileIcon>
            {company}
          </ProfileInfoTag>
        )}
      </ProfileContentInfo>
      <ProfileContentActions>
        <StyledLink
          onClick={() => navigateToUrl(htmlUrl)}
          target="_self"
          rel="noopener noreferrer"
          aria-label={`View ${name} profile on GitHub`}
        >
          <GithubIconWrapper>
            <GithubIcon />
          </GithubIconWrapper>
          Visit Profile
        </StyledLink>
        {email && (
          <StyledLink
            onClick={() => navigateToUrl(`mailto:${email}`)}
            target="_self"
            rel="noopener noreferrer"
            aria-label={`Send email to ${login}`}
          >
            <ProfileIcon>email</ProfileIcon>
            Send email
          </StyledLink>
        )}
        {blog && (
          <StyledLink
            onClick={() => navigateToUrl(blog)}
            target="_self"
            rel="noopener noreferrer"
            aria-label={`View portfolio of ${name}`}
          >
            <ProfileWebIcon />
            Visit portfolio
          </StyledLink>
        )}
      </ProfileContentActions>
    </ProfileContent>
  </ProfileRoot>
);

export default Profile;
