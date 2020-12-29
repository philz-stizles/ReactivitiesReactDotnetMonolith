import { RootStore } from './rootStore';
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Photo, Profile } from '../../api/agent'
import { IProfile } from '../../models/IProfile';

export default class ProfileStore {
    rootStore: RootStore

    @observable profile: IProfile | null = null
    @observable isLoading = true
    @observable isSubmitting = false
    @observable target = ''

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeObservable(this)
    }

    @action loadProfile = async (username: string) => {
        this.isLoading = true;
        try {
            const {data: profile} = await Profile.get(username)
            runInAction(() => {
                this.profile = profile
                this.isLoading = false
            })
        } catch (error) {
            runInAction(() => {
                this.isLoading = false
            })
            console.log(error)
        }
    }

    @action editProfile = async (profile: IProfile) => {
        this.isSubmitting = true
        try {
            await Profile.edit(profile)
            runInAction(() =>  {
                this.profile = profile
                this.isSubmitting = false
            })
        } catch (error) {
            this.isSubmitting = false
            console.log(error)
        }
    }

    @action uploadPhoto = async (id: IProfile) => {
        this.isSubmitting = true
        try {
            await Photo.upload(id)
            runInAction(() =>  {
                this.isSubmitting = false
            })
        } catch (error) {
            this.isSubmitting = false
            console.log(error)
        }
    }

    @action deletePhoto = async (id: string) => {
        this.isSubmitting = true
        try {
            await Photo.delete(id)
            runInAction(() =>  {
                this.isSubmitting = false
            })
        } catch (error) {
            this.isSubmitting = false
            console.log(error)
        }
    }

    @computed get isLoggedInUser() {
        const { user } = this.rootStore.userStore
        if(user && this.profile) {
            return (this.profile?.userName !== user.userName) ? false : true
        } else {
            return false
        }
    }
}

// export default createContext(new ProfileStore())