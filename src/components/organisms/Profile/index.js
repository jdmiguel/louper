/* material-ui */
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import EventIcon from '@mui/icons-material/Event';
import FolderIcon from '@mui/icons-material/Folder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CompanyIcon from '@mui/icons-material/Business';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

/* atoms */
import GithubIcon from '../../atoms/GithubIcon';

/* utils */
import { dataModel } from '../../../utils/models';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    '& > img': {
      borderRadius: '50%',
      height: 240,
      width: 240,
      '@media (max-width: 768px)': {
        height: 180,
        width: 180,
      },
    },
    marginTop: '25vh',
    '@media (max-width: 768px)': {
      marginTop: '12vw',
      flexDirection: 'column',
    },
  },
  profileContent: {
    marginLeft: 30,
    '@media (max-width: 768px)': {
      textAlign: 'center',
      marginLeft: 0,
      marginTop: 36,
    },
  },
  profileGithubInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    marginTop: 18,
    marginBottom: 12,
    '@media (max-width: 768px)': {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  profileGithubIcon: {
    fontSize: 'initial',
    lineHeight: 0,
    '& svg': {
      width: 22,
      '& path': {
        fill: theme.palette.primary.contrastText,
      },
    },
  },
  profileActions: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    marginRight: 14,
    '@media (max-width: 768px)': {
      justifyContent: 'center',
      marginRight: 0,
      marginBottom: 30,
    },
  },
  profileData: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 2,
  },
  profileTag: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    alignItems: 'center',
    marginRight: 8,
  },
  profileTagIcon: {
    color: theme.palette.text.main,
    fontSize: 25,
    padding: 4,
  },
  profileButton: {
    backgroundColor: theme.palette.primary.main,
    border: 0,
    borderRadius: '50%',
    color: theme.palette.primary.contrastText,
    height: 22,
    padding: 18,
    marginRight: 8,
    width: 22,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '@media (max-width: 768px)': {
      justifyContent: 'center',
    },
  },
  profileIconButton: {
    fontSize: 24,
  },
  gutterBottom: {
    marginBottom: 4,
  },
}));

const buildCreationDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString();

  return formattedDate.slice(0, formattedDate.indexOf(','));
};

const Profile = ({
  data: {
    avatarUrl,
    name,
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
}) => {
  const classes = useStyles();
  return (
    <div data-test="profile__wrapper" className={classes.wrapper}>
      <img data-test="profile__image" alt="user avatar" src={avatarUrl} />
      <div className="profile__content" className={classes.profileContent}>
        <Typography
          variant="h3"
          gutterBottom
          classes={{
            gutterBottom: classes.gutterBottom,
          }}
        >
          {name}
        </Typography>
        <Typography variant="h4">{bio}</Typography>
        <div className={classes.profileGithubInfo}>
          <div className={classes.profileData}>
            <div className={classes.profileTag}>
              <FolderIcon
                classes={{
                  root: classes.profileTagIcon,
                }}
                className="profile__icon"
              />
              {repos}
            </div>
            <div className={classes.profileTag}>
              <VisibilityIcon
                classes={{
                  root: classes.profileTagIcon,
                }}
                className="profile__icon"
              />
              {following}
            </div>
            <div className={classes.profileTag}>
              <FavoriteIcon
                classes={{
                  root: classes.profileTagIcon,
                }}
                className="profile__icon"
              />
              {followers}
            </div>
          </div>
          <div className={classes.profileData}>
            {createdAt && (
              <div className={classes.profileTag}>
                <EventIcon
                  classes={{
                    root: classes.profileTagIcon,
                  }}
                  className="profile__icon"
                />
                {buildCreationDate(createdAt)}
              </div>
            )}
            {location && (
              <div className={classes.profileTag}>
                <LocationOnIcon
                  classes={{
                    root: classes.profileTagIcon,
                  }}
                  className="profile__icon"
                />
                {location}
              </div>
            )}
            {company && (
              <div className={classes.profileTag}>
                <CompanyIcon
                  classes={{
                    root: classes.profileTagIcon,
                  }}
                  className="profile__icon"
                />
                {company}
              </div>
            )}
          </div>
        </div>

        <div className={classes.profileActions}>
          <IconButton
            classes={{
              root: classes.profileButton,
            }}
            onClick={() => window.open(htmlUrl, '_blank')}
          >
            <div className={classes.profileGithubIcon}>
              <GithubIcon />
            </div>
          </IconButton>
          {email && (
            <IconButton
              classes={{
                root: classes.profileButton,
              }}
              size="small"
              onClick={() => window.open(`mailto:${email}`, '_blank')}
            >
              <Icon
                classes={{
                  root: classes.profileIconButton,
                }}
              >
                email
              </Icon>
            </IconButton>
          )}
          {blog && (
            <IconButton
              classes={{
                root: classes.profileButton,
              }}
              size="small"
              onClick={() => window.open(blog, '_blank')}
            >
              <Icon
                classes={{
                  root: classes.profileIconButton,
                }}
              >
                link
              </Icon>
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  data: dataModel,
};

export default Profile;
