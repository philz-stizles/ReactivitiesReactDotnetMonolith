import { RootStore } from './rootStore';
import { IActivity } from './../../models/IActivity';
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Activities } from '../../api/agent'
import { SyntheticEvent } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export default class ActivityStore {
    rootStore: RootStore

    @observable activitiesRegistry = new Map()
    @observable activities: IActivity[] = []
    @observable selectedActivity: IActivity | null = null
    @observable isLoading = false
    @observable isSubmitting = false
    @observable target = ''
    @observable.ref hubConnection: HubConnection | null = null

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeObservable(this)
    }

    @computed get activitiesByDate() {
        const activities: IActivity[] = Array.from(this.activitiesRegistry.values())
        return activities // .sort((a, b) => a.date!.getTime() - b.date!.getTime())
    }

    @action createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat', {
                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build()

        this.hubConnection
            .start()
            .then(() => console.log(this.hubConnection?.state))
            .catch(error => console.log('Error establishing connection', error))

            this.hubConnection.on('RecieveComment', comment => {
                this.selectedActivity!.comments.push(comment)
            })
    }

    @action stopHubConnection = () => {
        this.hubConnection!.stop()
    }

    @action addComment = async (values: any) => {
        values.activityId = this.selectedActivity!.id
        try{
            await this.hubConnection!.invoke('SendComment', values)
        } catch (error) {
            console.log(error)
        }
    }

    @action loadActivities = async () => {
        this.isLoading = true;
        try {
            const {activities} = await Activities.list()
            runInAction(() => {
                activities.forEach((activity) => {
                    activity.date = new Date(activity.date)
                    this.activitiesRegistry.set(activity.id, activity);
                })
                this.isLoading = false
            })
        } catch (error) {
            runInAction(() => {
                this.isLoading = false
            })
            console.log(error)
        }
    }

    // @action loadActivities = () => {
    //     this.isLoading = true;
    //     Activities.list()
    //         .then(pagedActivities => {
    //             pagedActivities.activities.forEach((activity) => {
    //                 this.activities.push(activity);
    //             })
    //         })
    //         .catch(() => {
    //              this.isLoading = false
    //              console.log(error)
    //         })
    //         .finally(() => this.isLoading = false)
    // }

    // @action setActivity = (selectedActivity: IActivity | undefined | null) => {
    //     this.selectedActivity = selectedActivity
    // }

    // @action setCreateMode = () => {
    //     this.editMode = true
    //     this.selectedActivity = undefined
    // }

    // @action setEditMode = (id: string) => {
    //     this.selectedActivity = this.activitiesRegistry.get(id)
    //     this.editMode = true
    // }

    // @action closeForm = () => {
    //     this.editMode = false
    // }

    // @action closeDetail = () => {
    //     this.selectedActivity = undefined
    // }

    // @action selectActivity = (id: string) => {
    //     this.selectedActivity = this.activitiesRegistry.get(id)
    //     this.editMode = false
    // }

    // @action selectActivity = (id: string) => {
    //     this.selectedActivity = this.activities.find(activity => activity.id === id)
    //     this.editMode = false
    // }

    // @action getActivity = async (id: string) => {
    //     let activity = this.activitiesRegistry.get(id)
    //     console.log(this.selectActivity)
    //     if(activity) {
    //         this.selectedActivity = activity  
    //     } else {
    //         await this.loadActivity(id)
    //     }
    //     console.log(this.selectedActivity)
    // }

    @action loadActivity = async (id: string) => {
        let activity = this.activitiesRegistry.get(id)
        if(activity) {
            this.selectedActivity = activity
            return activity
        } else {
            this.isLoading = true
            try {
                const activity = (await Activities.details(id)).data
                activity.date = new Date(activity.date)
                runInAction(() =>  {
                    this.selectedActivity = activity
                    this.isLoading = false
                })
                return activity
            } catch (error) {
                runInAction(() => this.isLoading = false)
                console.log(error)
                throw(error)
            }
        }
    }

    @action clearActivity = () => {
        this.selectedActivity = null;
    }

    @action createActivity = async (activity: IActivity) => {
        console.log("here")
        this.isSubmitting = true
        try {
            await Activities.create(activity)
            runInAction(() =>  {
                this.activitiesRegistry.set(activity.id, activity)
                // this.editMode = false
                this.isSubmitting = false
            })
        } catch (error) {
            this.isSubmitting = false
            console.log(error)
        }
    }

    // @action createActivity = (activity: IActivity) => {
    //     this.isSubmitting = true
    //     Activities.create(activity)
    //         .then(response => {
    //             this.activities.push(activity)
    //             this.editMode = false
    //         }).catch(() {
    //              console.log(error)    
    //         })
    //         .finally(() => this.isSubmitting = false)
    // }

    @action editActivity = async (activity: IActivity) => {
        this.isSubmitting = true
        try {
            await Activities.update(activity)
            runInAction(() =>  {
                this.activitiesRegistry.set(activity.id, activity)
                this.selectedActivity = activity
                // this.editMode = false
                this.isSubmitting = false
            })
        } catch (error) {
            this.isSubmitting = false
            console.log(error)
        }
    }

    // @action editActivity = (activity: IActivity) => {
    //     this.isSubmitting = true
    //     Activities.update(activity)
    //         .then(response => {
    //             this.activities = [...this.activities.filter(a => a.id !== activity.id), activity]
    //             this.selectedActivity = activity
    //             this.editMode = false
    //         }).finally(() => this.isSubmitting = false)
    // }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.isSubmitting = true
        this.target = event.currentTarget.name
        try {
            await Activities.delete(id)
            this.activitiesRegistry.delete(id)
            // this.selectedActivity = (id === this.selectedActivity.id) ? undefined : this.selectActivity
            this.isSubmitting = false
            this.target = ''
        } catch (error) {
            this.isSubmitting = false
            this.target = ''
            console.log(error)
        }
    }

    // @action deleteActivity = (id: string) => {
    //     this.isLoading = true
    //     Activities.delete(id)
    //         .then(response => {
    //             this.activities = this.activities.filter(a => a.id !== id)
    //             this.editMode = false
    //         }).finally(() => this.isLoading = false)
    // }
}

// export default createContext(new ActivityStore())