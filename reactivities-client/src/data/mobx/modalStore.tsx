import { action, makeObservable, observable } from "mobx";
import { RootStore } from "./rootStore";

export default class ModalStore {
    rootStore: RootStore

    @observable.shallow modal = {
        open: false,
        body: null
    }

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeObservable(this)
    }

    @action openModal = (content: any) => {
        this.modal.open = true
        this.modal.body = content
    }

    @action closeModal = () => {
        this.modal.open = false
        this.modal.body = null
    }
}

// export default createContext(new ModalStore())