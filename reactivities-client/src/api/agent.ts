import axios, { AxiosResponse } from 'axios'
import { IActivity, IPagedActivity } from '../models/IActivity'

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Activities = {
    list: (): Promise<IPagedActivity> => requests.get('/Activities'),
    details: (id: string): Promise<IActivity> => requests.get(`/Activities/${id}`),
    create: (activity: IActivity) => requests.post('/Activities', activity),
    update: (activity: IActivity) => requests.put(`/Activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/Activities/${id}`)
}

export {
    Activities
}