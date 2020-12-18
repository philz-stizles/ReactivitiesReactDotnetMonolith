import { IActivity } from './../../models/IActivity';
import { action, observable } from "mobx";
import { createContext } from "react";
import { Activities } from '../../api/agent'

class ActivityStore {
    @observable activities: IActivity[] = []
    @observable selectedActivity: IActivity | undefined
    @observable isLoading = false
    @observable editMode = false

    @action loadActivities = () => {
        this.isLoading = true;
        Activities.list()
            .then(pagedActivities => {
                pagedActivities.activities.forEach((activity) => {
                    this.activities.push(activity);
                })
            })
            .finally(() => this.isLoading = false)
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(activity => activity.id === id)
        this.editMode = false
    }

    @action createActivity = async (activity: IActivity) => {
        Activities.create(activity)
            .then(response => {
                this.activities.unshift(activity);
                this.editMode = false
            }).then(() => this.isLoading = false)
    }

    @action editActivity = async (activity: IActivity) => {
        Activities.update(activity)
            .then(response => {
                this.activities = this.activities.filter(a => a.id !== activity.id)
                this.editMode = false
            }).then(() => this.isLoading = false)
    }

    @action deleteActivity = async (id: string) => {
        Activities.delete(id)
            .then(response => {
                this.activities = this.activities.filter(a => a.id != id);
                this.editMode = false
            }).then(() => this.isLoading = false)
    }
}

export default createContext(new ActivityStore())