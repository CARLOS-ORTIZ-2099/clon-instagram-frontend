/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */


import { createContext, useContext, useState } from "react"
import { createPublication, deletePublication, editPublication, getPublication, getPublications } from "../api/publication"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"


export const PublicationContext = createContext() 

export const PublicationProvider = ({children}) => {

  const [publication, setPublication] = useState({})// estado para ver la informacion de una publicacion en especifico

  // estados para la paginacion de las publicaciones.
  const [publications, setPublications] = useState([])

  const [hasMore, setHasMore] = useState(true)
  const [pending, setPending] = useState(false)

  const {user} = useAuth()
  const navigate = useNavigate()
  

  const createPublicationHandler = async (fields) => {
    if(!fields.file) {
        return alert('el archivo es obligatorio')
    }
    const formData = new FormData()
    console.log(fields);
    formData.append('file', fields.file )
    formData.append('content', fields.content)
    try {
        const response = await createPublication(formData)
        console.log(response);
        console.log(publications);
        if(!hasMore) {
          setPublications([...publications, response.data.publicationCreated])
        }
    }catch(error) {
        console.log(error);
    }
  }
 
  const getPublicationsHandler = async (skip) => { 
    setPending(true)
    try {  
     const response = await getPublications(skip) 
     console.log(response);
     if(response.data.response.length === 0) {
      setHasMore(false)
     }else {
      setTimeout(() => {
        setPublications((previous) => [...previous, ...response.data.response]) 
        setPending(false)
      }, 2000)
     } 
    }catch(error) {
      console.log(error);
    }
  }

  const deletePublicationHandler = async (id) => { 
    try{
        const {data : {publicationDeleted}} = await deletePublication(id)  
        console.log(publicationDeleted);
        console.log(publications);
        const publicationsUpdate = publications.filter((publication) => publication._id !== publicationDeleted._id)
        setPublications(publicationsUpdate) 
        navigate(`/profile/${user.username}`)  
    }catch(error) {
      console.log(error);
    }
  }


  const editPublicationHandler = async (id, fields) => {   
    let formData 
    if(!fields.file) {
        formData = fields
    } else {
      formData = new FormData()
      formData.append('file', fields.file )
      formData.append('content', fields.content || publication.content)
    }
    try {
      const {data} = await editPublication(id, formData)
      setPublication({...publication, content : fields.content || publication.content,
        file :  data?.file?.filename ? `/uploads/${data?.file?.filename}` : publication.file }
      )
      const modifyPublication = publications.map((p) => p._id === publication._id 
        ? {...p, content : fields.content || publication.content, 
          file :  data?.file?.filename ? `/uploads/${data?.file?.filename}` : publication.file
         } : p
      )
      setPublications(modifyPublication)
    }catch(error) {
      console.log(error);
    }
  }
 

  const getPublicationHandler = async (id) => {
    try{
      const response = await getPublication(id) 
      //console.log(response);
      setPublication(response.data.response)
    }catch(error) {
      console.log(error);
      navigate(`/${user.username}`)
    }
  }
 

  const data = {createPublicationHandler, deletePublicationHandler, editPublicationHandler, getPublicationHandler, getPublicationsHandler, publication, setPublication, publications, setPublications, pending, setPending, hasMore}

  return (
    <PublicationContext.Provider value={data}>
        {children}
    </PublicationContext.Provider>
  )
  
}


export const usePublication = () => {
    const contextShare =  useContext(PublicationContext)
    if(!contextShare) {
      throw new Error('no existe el hook')
    }
    return contextShare
}
  
