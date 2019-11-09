import { IUser, IUserFormValues } from '../models/user';
import { observable, action, computed, runInAction, reaction } from 'mobx';
import Agent from '../api/Agent';
import { RootStore } from './rootStore';
import { history } from '../..';

export default class UserStore {

	// HACIENDO REFRENCIA AL ROOTSTORE
	rootStore: RootStore;

	constructor(rootStore: RootStore){
        this.rootStore = rootStore;
                
	}

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {return !!this.user}

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await Agent.User.login(values);

            // Establecer acción
            runInAction(()=> {
                this.user = user;
            });

            console.log(" ::::::::::::::::   from - UserStore :::::::::::::::: ")
            console.log(user);
            //this.rootStore.activityStore.

            // >>> OK >>>
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/activities');


        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // TODO: accion para registrar usuario
    @action register = async (values: IUserFormValues) => {
        try {
            const user = await Agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/activities');
        } catch (error) {
            throw error;
        }
    }

    // TODO: nueva acción
    @action getUser = async () => {
        try{
            const user = await Agent.User.current();
            runInAction(()=>{
                this.user = user;
            })
        }
        catch (error){
            console.log(error);
        }
    }

    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/');
    }
}