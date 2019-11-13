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

const SubDataBlock = ({ children }) => <p>{children}</p>;

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
    <div data-test="userData-container" className="user-wrapper section">
      <img
        data-test="userData-image"
        alt="user avatar"
        src={avatarUrl}
        className="userAvatar"
      />
      <div className="txtContainer">
        <h3 data-test="userData-name">{name}</h3>
        <h4 data-test="userData-bio">{bio}</h4>
        <div className="subUserInfo">
          {email && (
            <SubDataBlock data-test="userData-email">
              <EmailIcon className="userDataIcon" />
              <a
                href={email}
                rel="noopener noreferrer"
                mailto={email}
                target="_blank"
              >
                {email}
              </a>
            </SubDataBlock>
          )}
          {location && (
            <SubDataBlock data-test="userData-location">
              <HomeIcon className="userDataIcon" /> {location}
            </SubDataBlock>
          )}
          {blog && (
            <SubDataBlock data-test="userData-blog">
              <LinkIcon className="userDataIcon" />
              <a href={blog} rel="noopener noreferrer" target="_blank">
                {blog}
              </a>
            </SubDataBlock>
          )}
          {company && (
            <SubDataBlock data-test="userData-company">
              <CompanyIcon className="userDataIcon" /> {company}
            </SubDataBlock>
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
