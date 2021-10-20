/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import Link from '../atoms/Link';

/* styles */
import {
  ProfileRoot,
  ProfileContent,
  ProfileContentInfo,
  ProfileContentActions,
  ProfileContentAction,
  ProfileInfoTag,
  ProfileIcon,
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
        <ProfileContentAction>
          <Link
            url={htmlUrl}
            ariaLabel={`View ${name} profile on GitHub`}
            content="VISIT PROFILE"
            withIcon
            iconType="person"
          />
        </ProfileContentAction>
        {email && (
          <ProfileContentAction>
            <Link
              url={`mailto:${email}`}
              ariaLabel={`Send email to ${login}`}
              content="SEND EMAIL"
              withIcon
              iconType="mail_outline"
            />
          </ProfileContentAction>
        )}
        {blog && (
          <ProfileContentAction>
            <Link
              url={blog}
              ariaLabel={`View portfolio of ${name}`}
              content="VISIT PORTFOLIO"
              withIcon
              iconType="web_icon"
            />
          </ProfileContentAction>
        )}
      </ProfileContentActions>
    </ProfileContent>
  </ProfileRoot>
);

export default Profile;
