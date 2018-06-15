import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class GithubTabs extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <div className='tabsContainer'>
                <Paper>
                    <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                        <Tab label="USER DATA" />
                        <Tab label="USER REPOS" />
                        <Tab label="USER FOLLOWING" />
                        <Tab label="USER FOLLOWERS" />
                    </Tabs>
                </Paper>
            </div>
        );
    }
}



GithubTabs.propTypes = {
    
};

export default GithubTabs;