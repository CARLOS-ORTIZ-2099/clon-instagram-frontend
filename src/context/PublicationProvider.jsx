/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */


import { createContext, useContext, useState } from "react"
import { createPublication, deletePublication, editPublication, getPublication, getPublications } from "../api/publication"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"


export const PublicationContext = createContext() 

export const PublicationProvider = ({children}) => {

  const [active, setActive] = useState(false)  // estado para activar el formulario de crear
  const [created, setCreated] = useState(false) // estado para verificar si se creo algo 
  const [publication, setPublication] = useState({})// estado para ver la informacion de la publicacion
  const [editMode, setEditMode] = useState(false)// si esta en modo edicion

  // estados para la paginacion de las publicaciones.
  const [publications, setPublications] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [pending, setPending] = useState(false)

  const {user} = useAuth()

  const navigate = useNavigate()

  const changeActive = () => setActive(!active) 

  const createPublicationHandler = async (e, fields) => {
    e.preventDefault()
    const formData = new FormData()
    console.log(fields);
    formData.append('file', fields.file )
    formData.append('content', fields.content)
    try {
        const response = await createPublication(!fields.file ? fields : formData)
        console.log(response);
        setCreated(!created)
        setActive(false)
    }catch(error) {
        console.log(error);
    }
  }
 

  const deletePublicationHandler = async (id) => {
    try{
        const response = await deletePublication(id)
        console.log(response);
        //setCreated(!created)
        navigate(`/${user.username}`) 
    }catch(error) {
      console.log(error);
    }

  }


  const editPublicationHandler = async (e, id, fields) => {   
    e.preventDefault()
    const formData = new FormData()
    console.log(fields);
    formData.append('file', fields.file )
    formData.append('content', fields.content || publication.content)
    try {
      const response = await editPublication(id, !fields.file ? fields : formData)
      console.log(response);
      setCreated(!created)
      setEditMode(false)
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
 
 
  const getPublicationsHandler = async (page) => { 
    setPending(true)
    try {  
     const response = await getPublications(page) 
     console.log(response);
     if(response.data.response.length === 0) {
      setHasMore(false)
     }else {
      setTimeout(() => {
        setPublications((previous) => [...previous, ...response.data.response]) 
        setPage((previous) => previous+1)
        setPending(false)
      }, 2000)
     }
     
    }catch(error) {
      console.log(error);
    }
  }



  const data = {active, changeActive, createPublicationHandler, created, setCreated, deletePublicationHandler, editPublicationHandler, getPublicationHandler, publication, editMode, setEditMode, getPublicationsHandler, publications, page, hasMore, pending, setPending, setPublications}

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
  
