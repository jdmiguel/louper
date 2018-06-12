import React, { Component } from 'react';
import './App.css';
import {getRepos,getUserData} from './controllers/github-api';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

class App extends Component {
  componentDidMount(){
    getRepos('jdmiguel').then( result => console.log(result))
    getUserData('jdmiguel').then( result => console.log(result))
  }

  render() {
    const styles = theme => ({
      progress: {
        margin: theme.spacing.unit * 2,
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      margin: {
        margin: theme.spacing.unit,
      },
      cssLabel: {
        '&$cssFocused': {
          color: purple[500],
        },
      },
      cssFocused: {},
      cssUnderline: {
        '&:after': {
          borderBottomColor: purple[500],
        },
      },
      bootstrapRoot: {
        padding: 0,
        'label + &': {
          marginTop: theme.spacing.unit * 3,
        },
      },
      bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
          'Roboto',
          'Arial',
          'sans-serif'
        ].join(','),
        '&:focus': {
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
      bootstrapFormLabel: {
        fontSize: 18,
      },
    });
    
    const theme = createMuiTheme({
      palette: {
        primary: green,
      },
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
            <FormControl className={styles.margin}>
            <InputLabel
              FormLabelClasses={{
                root: styles.cssLabel,
                focused: styles.cssFocused,
              }}
              htmlFor="custom-css-input"
            >
              Add Github User 
            </InputLabel>
            <Input
              classes={{
                underline: styles.cssUnderline,
              }}
              id="custom-css-input"
            />
          </FormControl>
          <div>
            <CircularProgress className={styles.progress} style={{ color: purple[500] }} thickness={7} />
          </div>
      </div>
    );
  }
}

export default App;
