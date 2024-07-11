import { instance } from "../libs/axiosConfig";



export const createComment = (id, data) => instance.post('/comment/create-comment/'+id, data)


export const deletecomment = (id) => instance.delete('/comment/delete-comment/'+id) 


export const editComment = (id, data) => instance.put('/comment/edit-comment/'+id, data)






