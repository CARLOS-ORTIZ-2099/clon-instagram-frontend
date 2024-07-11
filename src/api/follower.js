import { instance } from "../libs/axiosConfig";


export const createfollower = (id) => instance.post('/follower/create-follower/'+id)

export const unFollowUser = (id) => instance.delete('/follower/delete-followed/'+id)


export const getFollowers = (id) => instance.get('/follower/get-followers/'+id)


export const getFolloweds = (id) => instance.get('/follower/get-followeds/'+id)



