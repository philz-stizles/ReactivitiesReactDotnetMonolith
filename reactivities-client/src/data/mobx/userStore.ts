import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { User } from "../../api/agent";
import { IUser, IUserLogin, IUserRegister } from '../../models/IAuth';
import { RootStore } from "./rootStore";
import { history } from '../..'

export default class UserStore {
    rootStore: RootStore

    @observable user: IUser | null =  null
    @observable isSubmitting = false

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeObservable(this)
    }

    @computed get isLoggedIn() {
        return !!this.user
    }

    @action register = async (credentials: IUserRegister) => {
        console.log(credentials)
        this.isSubmitting = true
        try {
            await User.register(credentials)
            this.isSubmitting = false
        } catch (error) {
            this.isSubmitting = false
            console.log(error)
        }
    }

    @action login = async (credentials: IUserLogin) => {
        console.log(credentials)
        this.isSubmitting = true
        try {
            const { token, userDetails} = await User.login(credentials)
            runInAction(() => {
                this.user = userDetails
                this.user.token = token
                this.isSubmitting = false
            })
            this.rootStore.commonStore.setToken(token)
            this.rootStore.modalStore.closeModal()
            history.push('/activities')
        } catch (error) {
            runInAction(() => {
                this.isSubmitting = false
            })
            throw(error)
        }
    }

    @action facebookLogin = async (response: any) => {
        console.log(response)
    }

    @action googleLogin = async (response: any) => {
        console.log(response)
    }

    @action getUser = async () => {
        try {
            const user = (await User.currentUser()).userDetails
            console.log(user)
            runInAction(() =>  {
                this.user = user
            //     this.isLoading = false
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action logout = async () => {
        this.rootStore.commonStore.setToken(null)
        this.user = null
        history.push('/')
    }
}

// export default createContext(new UserStore())