import { IActivity } from "./IActivity";

export interface IProfile {
    userName: string
    displayName: string
    bio: string
    image: string
    userActivities: IActivity[]
    photos: IPhoto[]
    isFollowed: boolean
    followerCount: number
    followeeCount: number
}

export interface IPhoto {
    id: string
    url: string
    isMain: boolean
}

export interface IProfileResponse {
    status: boolean
    message: string
    data: IProfile
}