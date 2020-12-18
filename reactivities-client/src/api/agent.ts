import { IUser, IUserLogin, IUserLoginResponse, IUserRegister } from './../models/IUser';
import axios, { AxiosResponse } from 'axios'
import { IActivity, IActivityResponse, IPagedActivity } from '../models/IActivity'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('token')

    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(undefined, (error) => {
    if(error.response.status === 404){
        throw error.response
    }
})

const responseBody = (response: AxiosResponse) => response.data
 
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const User = {
    register: (credentials: IUserRegister) => requests.post('/Auth/RegisterWithReturnToken', credentials),
    login: (credentials: IUserLogin): Promise<IUserLoginResponse> => requests.post('/Auth/Login', credentials),
    currentUser: (): Promise<IUser> => requests.get(`/Auth/CurrentUser`)
}

const Activities = {
    list: (): Promise<IPagedActivity> => requests.get('/Activities'),
    details: (id: string): Promise<IActivityResponse> => requests.get(`/Activities/${id}`),
    create: (activity: IActivity) => requests.post('/Activities', activity),
    update: (activity: IActivity) => requests.put(`/Activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/Activities/${id}`)
}

export {
    User,
    Activities
}