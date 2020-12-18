export interface IUser {
    id: string
    email: string
    userName: string
    displayName: string
    token: string
    image?: string
}

export interface IUserRegister {
    userName: string
    displayName: string
    email: string
    password: string
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserLoginResponse {
    userDetails: IUser
    token: string
}