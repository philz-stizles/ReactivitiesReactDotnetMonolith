import { action, makeObservable, observable, reaction } from "mobx";
import { RootStore } from "./rootStore";

export default class CommonStore {
    rootStore: RootStore

    @observable token: string | null = window.localStorage.getItem('token')
    @observable appLoaded = false

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeObservable(this)

        reaction(() => this.token, token => {
            if(token){
                window.localStorage.setItem('token', token)
            }else{
                window.localStorage.removeItem('token')
            }
        })
    }

    @action setToken = (token: string | null) => {
        this.token = token
    }

    @action retrieveToken = () => {
        this.token = window.localStorage.getItem('token')
    }

    @action setAppLoaded = () => {
        this.appLoaded = true
    }
}