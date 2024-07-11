import { instance } from "../libs/axiosConfig";


export const likePublication = (idpublication) => instance.post('/like/create-like/'+idpublication) 



export const getLikePublication = (idpublication) => instance.get('/like/get-likes/'+idpublication) 


