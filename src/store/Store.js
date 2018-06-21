import { extendObservable } from 'mobx';

class Store{
    constructor(){
        extendObservable(this,
            {
                userData: '',
                userRepos: '',
                userFollowing: ''
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

    setUserFollowing(data){
        this.userFollowing = data;
    }

    getUserFollowing(){
        return this.userFollowing;
    }
}

let storeInstance = new Store();

export default storeInstance;