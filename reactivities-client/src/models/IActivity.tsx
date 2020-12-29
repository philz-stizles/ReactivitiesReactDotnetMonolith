import { IAttendee } from "./IAttendee";

export interface IActivity{
    id: string
    title: string
    description: string
    date: Date
    category: string
    city: string
    venue: string
    // attendees: IAttendee[]
}

export interface IPagedActivity {
    activities: IActivity[]
    count: number
}

export interface IActivityResponse {
    status: boolean
    message: string
    data: IActivity
}

export interface IActivityFormValues extends Partial<IActivity> { // Partial allows you to make all the fields
    // in the target Type(T) e.g IActivity optional fields in the new interface e.g IActivityFormValues
    time?: Date
}

export class ActivityFormValues implements IActivityFormValues {
    id?: string = undefined
    title: string = ''
    category: string = ''
    description: string = ''
    date?: Date = undefined
    time?: Date = undefined
    city: string = ''
    venue: string = ''

    constructor(init?: IActivityFormValues) {
        if(init && init.date){
            init.time = init.date
        }

        Object.assign(this, init)
    }
}