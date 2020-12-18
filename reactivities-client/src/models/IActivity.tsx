import { IAttendee } from "./IAttendee";

export interface IActivity{
    id: string
    title: string
    description: string
    date: string
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