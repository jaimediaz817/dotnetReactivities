import { RootStore } from './rootStore';
import { observable, action, reaction } from 'mobx';

export default class CommonStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore)
    {
        this.rootStore = rootStore;

        // agregar una reacción: , el segundo parametro es que hacer cuando cambie el token
        reaction(
            () => this.token,
            token => {
                if(token){
                    window.localStorage.setItem('jwt', token);
                }else{
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    // OBSERVABLES
    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    @action setToken = (token: string | null) => {
        //window.localStorage.setItem('jwt', token!);
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}