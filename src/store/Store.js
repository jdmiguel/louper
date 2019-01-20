import { extendObservable } from 'mobx';

class Store{
    constructor(){
        extendObservable(this,
            {
                userExists: false,
                userData: '',
                userRepos: '',
                userFollowing: ''
            }
        );
    }

    setUserExists(){
        this.userExists = true;
    }

    getIfUserExists(){
        return this.userExists;
    }

    getUserData(){
        return this.userData;
    }

    setUserData(data){
        this.userData = data;
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