import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import Agent from "../api/Agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable loadingInitial = false;
  @observable activity: IActivity | null = null;
  @observable submitting = false;
  @observable target = "";

  // PROPIEDADES CALCULDAS
  @computed get activitiesByDate() {
    //console.log(this.groupActivitiesByDate(Array.from(this.activityRegistry.values())));
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
    // return Array.from(this.activityRegistry.values()).sort(
    //   (a, b) => Date.parse(a.date) - Date.parse(b.date)
    // );
  }

  // group
  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    //return sortedActivities;
    //return Object.entries(sortedActivities);
    return Object.entries(
      sortedActivities.reduce(
        (activities, activity) => {
          const date = activity.date.split("T")[0];
          activities[date] = activities[date]
            ? [...activities[date], activity]
            : [activity];
          return activities;
        },
        {} as { [key: string]: IActivity[] }
      )
    );
  }

  // LOAD Activities
  @action loadActionActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await Agent.Activities.list();
      runInAction("loading activities", () => {
        activities.map(act => {
          act.date = act.date.split(".")[0];
          this.activityRegistry.set(act.id, act);
        });

        // probando la funcion
        //console.log(this.groupActivitiesByDate(activities));

        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading activities error", () => {
        console.log(error);
        this.loadingInitial = false;
      });
      console.log(error);
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
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await Agent.Activities.details(id);
        runInAction("getting activity", () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("getting activity error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
        throw error;        
      }
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  // Crear actividad
  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await Agent.Activities.create(activity);
      runInAction("create activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create activity error", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await Agent.Activities.update(activity);
      runInAction("editing activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("edit activity error", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await Agent.Activities.delete(id);
      runInAction("deleting activity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("deleting activity error", () => {
        this.submitting = false;
        this.target = "";
        console.log(error);
      });
    }
  };
}

export default createContext(new ActivityStore());
