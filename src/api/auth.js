import { instance } from "../libs/axiosConfig";


export const registerUser = data => instance.post('/auth/register', data)

export const loginUser = data => instance.post('/auth/login', data,{withCredentials: true})

export const verifyToken = () => instance.get('/auth/verify')

export const logoutUser = () => instance.get('/auth/logout')

export const profileUser = (username) => instance.get('/auth/profile/'+username)

export const searchUser = (username) => instance.get('/auth/user-search?username='+username)







/* function promise (num) {
    return new Promise((resolve, reject) => {
        if(num % 2 === 0) {
            resolve('good')
        }
        else{
            reject('bad')
        }
    })
} */



