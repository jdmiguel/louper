import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './styles.css';

class Menu extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
        this.props.onClickMenu(value);
    };

    render() {
        return (
            <div className='menu'>
                <Paper>
                    <Tabs value={this.state.value}
                          onChange={this.handleChange}
                          indicatorColor="primary"
                          textColor="primary"
                          className="tabs"
                          centered>
                        <Tab label="USER DATA" />
                        <Tab label="USER REPOS" />
                        <Tab label="USER FOLLOWING" />
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

export default Menu;