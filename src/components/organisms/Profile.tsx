/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import Label from '../atoms/Label';
import Link from '../atoms/Link';

/* types */
import { User } from '../../utils/types';

/* styles */
import {
  ProfileRoot,
  ProfileContent,
  ProfileContentInfo,
  ProfileContentActions,
  ProfileContentAction,
  ProfileLabel,
} from './styles';

const buildCreationDate = (date: string) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString();

  return formattedDate.slice(0, formattedDate.indexOf(','));
};

type Props = {
  user: User;
};

const Profile = ({
  user: {
    avatar_url,
    name,
    login,
    bio,
    public_repos,
    following,
    followers,
    created_at,
    location,
    company,
    html_url,
    email,
    blog,
  },
}: Props) => (
  <ProfileRoot>
    <img alt="user avatar" src={avatar_url} />
    <ProfileContent>
      <Typography variant="h3" sx={{ marginBottom: 0.4 }}>
        {name}
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {login}
      </Typography>
      <Typography variant="body2">{bio}</Typography>
      <ProfileContentInfo>
        <ProfileLabel>
          <Label content={`${public_repos}`} withIcon iconType="folder" />
        </ProfileLabel>
        <ProfileLabel>
          <Label content={`${following}`} withIcon iconType="visibility" />
        </ProfileLabel>
        <ProfileLabel>
          <Label content={`${followers}`} withIcon iconType="favorite" />
        </ProfileLabel>
        {created_at && (
          <ProfileLabel>
            <Label content={buildCreationDate(created_at)} withIcon iconType="event_note" />
          </ProfileLabel>
        )}
        {location && (
          <ProfileLabel>
            <Label content={location} withLowerCase withIcon iconType="location_on" />
          </ProfileLabel>
        )}
        {company && (
          <ProfileLabel>
            <Label content={company} withLowerCase withIcon iconType="business" />
          </ProfileLabel>
        )}
      </ProfileContentInfo>
      <ProfileContentActions>
        <ProfileContentAction>
          <Link
            url={html_url}
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
