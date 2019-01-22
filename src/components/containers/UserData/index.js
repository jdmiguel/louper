import React from 'react';
import { userDataModel } from '../../../utils/models';
import IconEmail from '@material-ui/icons/Email';
import IconHome from '@material-ui/icons/Home';
import IconLink from '@material-ui/icons/Link';
import IconCompany from '@material-ui/icons/Contacts';
import Btn from '../../core/Btn';
import './styles.css';

const UserData =  ({ data }) => {
    const {
        avatar_url, 
        name, 
        bio, 
        email, 
        location, 
        blog, 
        company, 
        html_url
    } = data;

    return (
        <div className='userDataContainer'>
            <img 
                alt="user avatar"
                src={avatar_url}
                className='userAvatar'
            />
            <div className='txtContainer'>
                <h1>{name}</h1>
                <h2>{bio}</h2>
                <div className='subUserInfo'>
                    { email && 
                        <p>
                            <IconEmail className='userDataIcon'/>
                            <a 
                                href={email} 
                                rel="noopener noreferrer" 
                                mailto={email} 
                                target='_blank'>{email}
                            </a>
                        </p>
                    }
                    { location && 
                        <p>
                            <IconHome className='userDataIcon'/> {location}
                        </p>
                    }
                    { blog && 
                        <p>
                            <IconLink className='userDataIcon'/>
                            <a 
                                href={blog}
                                rel="noopener noreferrer" 
                                target='_blank'>{blog}
                            </a>
                        </p>
                    }
                    { company && 
                        <p>
                            <IconCompany className='userDataIcon'/> {company}
                        </p>
                    }
                </div>
                <Btn onClick={ () => window.open(html_url,'_blank') }
                     type="account_circle"
                     txt="VISIT PROFILE" />
            </div>
        </div>
    )
};

UserData.propTypes = {
    data: userDataModel
};

export default UserData;