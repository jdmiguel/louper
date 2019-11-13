import React from 'react';

/* material-ui */
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import LinkIcon from '@material-ui/icons/Link';
import CompanyIcon from '@material-ui/icons/Contacts';

/* core */
import Btn from '../../core/Btn';

/* styles */
import './styles.css';

const UserData = ({ userData }) => {
  const {
    avatarUrl,
    name,
    bio,
    email,
    location,
    blog,
    company,
    htmlUrl
  } = userData;

  return (
    <div className="user-wrapper section">
      <img alt="user avatar" src={avatarUrl} className="userAvatar" />
      <div className="txtContainer">
        <h3>{name}</h3>
        <h4>{bio}</h4>
        <div className="subUserInfo">
          {email && (
            <p>
              <EmailIcon className="userDataIcon" />
              <a
                href={email}
                rel="noopener noreferrer"
                mailto={email}
                target="_blank"
              >
                {email}
              </a>
            </p>
          )}
          {location && (
            <p>
              <HomeIcon className="userDataIcon" /> {location}
            </p>
          )}
          {blog && (
            <p>
              <LinkIcon className="userDataIcon" />
              <a href={blog} rel="noopener noreferrer" target="_blank">
                {blog}
              </a>
            </p>
          )}
          {company && (
            <p>
              <CompanyIcon className="userDataIcon" /> {company}
            </p>
          )}
        </div>
        <Btn
          onClick={() => window.open(htmlUrl, '_blank')}
          type="account_circle"
          txt="VISIT PROFILE"
        />
      </div>
    </div>
  );
};

export default UserData;
