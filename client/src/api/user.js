import axios from 'axios'

const API = axios.create({ baseURL: `${import.meta.env.VITE_BASEURL}/api/user/` })
//HEADER AUTHORIZATION
API.interceptors.request.use((req) => {
    const isUserStored = Boolean(localStorage.getItem('persist:root'))
    if (isUserStored) {
        const storedUser = localStorage.getItem('persist:root')
        const storedToken = JSON.parse(JSON.parse(storedUser).user).token
        req.headers.authorization = `Bearer ${storedToken}`
    }
    return req
})

export const currentUser = () => API.get('/')
export const loginUser = (credentials) => API.post('/login', credentials)
export const signUpUser = (details) => API.post('/signup', details)
export const refreshUser = () => API.post("/refresh")
export const getUser = (userId) => API.get(`/${userId}`)
export const updateUser = (details) => API.patch('/update', details)
export const followUser = (userToBeFollowed) => API.post(`/follow/${userToBeFollowed}`)