import { action, computed, makeObservable, observable } from "mobx";
import { User } from "../../api/agent";
import { IUser, IUserLogin, IUserRegister } from '../../models/IUser';
import { RootStore } from "./rootStore";

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
        this.isSubmitting = true
        try {
            const user = await User.login(credentials)
            this.user = user
            this.isSubmitting = false
        } catch (error) {
            this.isSubmitting = false
            console.log(error)
        }
    }
}

// export default createContext(new UserStore())