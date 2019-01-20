import React, {Component, Fragment} from 'react';
import Menu from '../../core/Menu';
import FloatBtn from '../../core/FloatBtn';
import storeInstance from '../../../store/Store';
import './styles.css';
class Content extends Component {

    menuHandler = index => {
        switch(index){
            default:
            case 0:
                this.props.history.push('/user/data');
            break;
            case 1:
                this.props.history.push('/user/repos');
            break; 
            case 2:
                this.props.history.push('/user/following');
            break; 
        }
    }

    backIntroHandler = () => this.props.history.push('/');

    componentWillMount(){
        if(!storeInstance.getIfUserExists()) this.backIntroHandler();
    }

    render(){
        return(
            <Fragment>
                <Menu onClickMenu={this.menuHandler}/>
                <FloatBtn clickHandler={this.backIntroHandler}/>
            </Fragment>
        )
    }
}

export default Content;