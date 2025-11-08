import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useUser } from '@/contexts/UserContext';
import TextTag from '@/components/shared/TextTag';
import Link from '@/components/shared/Link';
import { ICON_TYPE, LINK_TEXT } from '@/utils/literals';
import {
  StyledRoot,
  StyledAvatarWrapper,
  StyledContent,
  StyledHeadings,
  StyledDetails,
  StyledTextTagWrapper,
  StyledAction,
} from './styles';

const buildCreationDate = (date: string) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString();

  return formattedDate.slice(0, formattedDate.indexOf(','));
};

const Profile = () => {
  const { user } = useUser();
  const {
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
  } = user;

  return (
    <StyledRoot>
      <StyledAvatarWrapper>
        <Avatar sx={{ width: 240, height: 240, position: 'absolute' }} />
        <Avatar
          alt="user avatar"
          src={avatar_url}
          sx={{
            width: 240,
            height: 240,
            position: 'absolute',
            boxShadow: '0px 0px 14px 6px rgb(41 112 146 / 60%)',
          }}
        />
      </StyledAvatarWrapper>
      <StyledContent>
        <StyledHeadings>
          {name && (
            <Typography variant="h3" sx={{ marginBottom: 0.4 }}>
              {name}
            </Typography>
          )}
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            {login}
          </Typography>
          {bio && (
            <Typography
              sx={{
                color: 'secondary.light',
                overflow: 'hidden',
                maxWidth: 240,
                textOverflow: 'ellipsis',
              }}
            >
              {bio}
            </Typography>
          )}
        </StyledHeadings>
        <StyledDetails>
          <StyledTextTagWrapper>
            <TextTag content={`${public_repos}`} withUppercase withIcon iconType={ICON_TYPE.repo} />
          </StyledTextTagWrapper>
          <StyledTextTagWrapper>
            <TextTag
              content={`${following}`}
              withUppercase
              withIcon
              iconType={ICON_TYPE.following}
            />
          </StyledTextTagWrapper>
          <StyledTextTagWrapper>
            <TextTag
              content={`${followers}`}
              withUppercase
              withIcon
              iconType={ICON_TYPE.followers}
            />
          </StyledTextTagWrapper>
          <StyledTextTagWrapper>
            <TextTag
              content={buildCreationDate(created_at)}
              withIcon
              iconType={ICON_TYPE.creationDate}
            />
          </StyledTextTagWrapper>
          {location && (
            <StyledTextTagWrapper>
              <TextTag content={location} withIcon iconType={ICON_TYPE.location} />
            </StyledTextTagWrapper>
          )}
          {company && (
            <StyledTextTagWrapper>
              <TextTag content={company} withIcon iconType={ICON_TYPE.company} />
            </StyledTextTagWrapper>
          )}
        </StyledDetails>
        <>
          <StyledAction>
            <Link
              url={html_url}
              ariaLabel={`View ${login} profile on GitHub`}
              content={LINK_TEXT.profile}
              withIcon
              iconType={ICON_TYPE.profile}
            />
          </StyledAction>
          {email && (
            <StyledAction>
              <Link
                url={`mailto:${email}`}
                ariaLabel={`Send email to ${login}`}
                content={LINK_TEXT.email}
                withIcon
                iconType={ICON_TYPE.email}
              />
            </StyledAction>
          )}
          {blog && (
            <StyledAction>
              <Link
                url={blog}
                ariaLabel={`View portfolio of ${login}`}
                content={LINK_TEXT.portfolio}
                withIcon
                iconType={ICON_TYPE.portfolio}
              />
            </StyledAction>
          )}
        </>
      </StyledContent>
    </StyledRoot>
  );
};

export default Profile;
