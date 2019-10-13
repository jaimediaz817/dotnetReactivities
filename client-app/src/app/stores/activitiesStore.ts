import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import Agent from '../api/Agent';

configure({ enforceActions: 'always'})

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    // PROPIEDADES CALCULDAS
    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }    

    // LOAD Activities
    @action loadActionActivities = async () => {

        this.loadingInitial = true;
        try 
        {
            const activities = await Agent.Activities.list()
            runInAction('loading activities', ()=> {
                activities.map((act) =>{
                    act.date =  act.date.split('.')[0];
                    this.activityRegistry.set(act.id, act);
                });
                this.loadingInitial = false;
            })
        }
        catch(error)
        {
            runInAction('loading activities error', ()=> {
                console.log(error)
                this.loadingInitial = false;
            });
        }

		// const activities = await Agent.Activities.list()
		// 	.then(activities => {				
		// 		activities.map((act) =>{
		// 			act.date =  act.date.split('.')[0];
		// 			this.activities.push(act);
		// 		});
		// 		console.log(activities);			
        //     })
        //     .catch((error) => console.log("error", error))
        //     .finally(() => this.loadingInitial = false);
    }


    // Crear actividad    
    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try
        {
            await Agent.Activities.create(activity);
            runInAction('create activity', ()=> {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.submitting = false;      
            });
        }
        catch(error)
        {
            runInAction('create activity error', ()=> {
                this.submitting = false;      
                console.log(error);
            });
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try{
            await Agent.Activities.update(activity);            
            runInAction('editing activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            });
        }
        catch(error){
            runInAction('edit activity error', ()=> {
                this.submitting = false;
                console.log(error);
            });
        }
    }

    @action deleteActivity = async (event:SyntheticEvent<HTMLButtonElement>, id:string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await Agent.Activities.delete(id);
            runInAction('deleting activity', () => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        }
        catch(error){
            runInAction('deleting activity error', () => {
                this.submitting = false;
                this.target = '';
                console.log(error);
            });
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;   
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);//.find(a => a.id === id);
        this.editMode = false
    }
}

export default createContext(new ActivityStore())