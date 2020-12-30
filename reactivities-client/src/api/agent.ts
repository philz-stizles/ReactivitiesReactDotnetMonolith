import { IUserLogin, IUserLoginResponse, IUserRegister } from '../models/IAuth'
import axios, { AxiosResponse } from 'axios'
import { IActivity, IActivityResponse, IPagedActivity } from '../models/IActivity'
import { history } from '..'
import { toast } from 'react-toastify'
import { IProfile, IProfileResponse } from '../models/IProfile'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('token')

    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(undefined, (error) => {
    // Network Error or API unreachable
    if(error.message === 'Network Error' && !error.response){
        toast.error('Check network connection')
    }

    const { status, data, config, headers } = error.response

    if(status === 404){
        history.push('/notfound')
    }

    // Handle the situation where an expected NOTFOUND response returns BAD REQUEST due to GUID validation
    if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')){
        history.push('/notfound')
    }

    // Handling Internal Server error
    if(status === 500){
        toast.error('Server error - Please try again later')
    }

    throw error.response
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
    facebookLogin: (accessToken: string): Promise<IUserLoginResponse> => requests.post('/Auth/FacebookLogin', {accessToken}),
    currentUser: (): Promise<IUserLoginResponse> => requests.get(`/Auth/CurrentUser`)
}

const Profile = {
    get: (username: string): Promise<IProfileResponse> => requests.get(`/User/${username}`),
    edit: (profile: IProfile) => requests.put(`/User/${profile.userName}`, profile)
}

const Photo = {
    upload: (file: IProfile) => requests.post(`/Photo`, file),
    delete: (id: string) => requests.delete(`/Photo/${id}`),
    setMain: (id: string) => requests.put(`/Photo/${id}`, {}),
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
    Profile,
    Photo,
    Activities
}