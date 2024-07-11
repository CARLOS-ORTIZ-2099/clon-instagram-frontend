import { instance } from "../libs/axiosConfig";


export const createPublication = data => 
    instance.post('/publication/create-publication', data, {
        headers : {'Content-Type': 'multipart/form-data'}
})

 
export const deletePublication = (id) => instance.delete('/publication/delete-publication/'+id)



export const getPublication = (id) => instance.get('/publication/get-publication/p/'+id)




export const editPublication = (id, body) => instance.put('/publication/edit-publication/'+id, body)



export const getPublications = (page, limit) => {
    return instance.get('/publication/get-publications?page='+page+'&limit='+limit)  
}





