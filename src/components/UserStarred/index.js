import React from 'react';
import { starredDataModel } from '../../utils/models';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';
import './styles.css';

const clickListHandler = url => window.open(url,'_blank');

const Starred = ({ data }) => (
    <div className='userStarredContainer'>
        <List>
        {
            data.map((repo,i) => (
                    <ListItem key={repo.name + i}
                            button
                            onClick={ () => clickListHandler(repo.html_url) }
                            className='itemUserStarred'>
                            <Avatar>
                                <StarIcon className='iconUserStarred'/>
                            </Avatar>
                            <ListItemText primary={repo.name} 
                                        secondary={repo.owner.login} />
                            
                    </ListItem> 
                ))
        }
        </List>
    </div>
);

Starred.propTypes = {
    data: starredDataModel
}

export default Starred;