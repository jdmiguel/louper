import React from 'react';
import storeInstance from '../../store/Store';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Folder from '@material-ui/icons/Folder';
import './styles.css';

const clickListHandler = url => window.open(url,'_blank');

const UserRepos = props => {
    const data = storeInstance.getUserRepos();
    
    return (
        <div className='userReposContainer'>
            <List>
            {
                data.map((repo,i) => {
                    return(
                        <ListItem key={i}
                              button
                              onClick={ () => clickListHandler(repo.html_url) }
                              className='itemRepo'>
                                <Folder className='iconUserRepos'/>
                                {repo.name}
                        </ListItem> 
                    )
                })
            }
            </List>
        </div>
    );
}

export default UserRepos;