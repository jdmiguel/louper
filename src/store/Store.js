import { extendObservable } from 'mobx';

class Store{
    constructor(){
        extendObservable(this,
            {
                userData: '',
                userRepos: ''
            }
        );
    }

    setUserData(data){
        this.userData = data;
    }

    getUserData(){
        return this.userData;
    }

    setUserRepos(data){
        this.userRepos = data;
    }

    getUserRepos(){
        return this.userRepos;
    }
}

let storeInstance = new Store();

export default storeInstance;