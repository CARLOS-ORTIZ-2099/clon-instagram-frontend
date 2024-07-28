/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from "react"
import { createComment, deletecomment, editComment } from "../api/comment"
import { usePublication } from "./PublicationProvider"


const CommentContext = createContext()

export const CommentProvider = ({children}) => {

  const {publication, setPublication, publications, setPublications} = usePublication()



  const deleteCommentHandler = async (id) => {
    try{
      //console.log(id); 
      const response = await deletecomment(id)
      //console.log(response);
      const updateComments = publication.comments.filter((comment) => comment._id != id)
      setPublication({...publication, comments : updateComments})
      const publicationUpdate  = publications.map((pb) => pb._id === publication._id ?
        {...pb, comments : pb.comments.filter((comment) => comment._id !== id)} : pb
      )
      setPublications(publicationUpdate)

    }catch(error) {
      console.log(error);
    }
  }


  const createCommentHandler = async (id, fields) => { 
    console.log(id, fields);
    if(fields.content.trim().length < 1) {
      alert('inserta un comentario')
      return
    }
     try {
        const {data : {comment}} = await createComment(id, fields)
        console.log(comment);
        //console.log(publication);
        console.log(publications);
        setPublication((previous) => ( {...previous, comments : [...previous.comments, comment]} ))

        const publicationUpdate = publications.map((pb) => pb._id === id 
        ? {...pb, comments : [...pb.comments, comment ]} : pb 
        )
        setPublications(publicationUpdate)
     }catch(error) {
        console.log(error);
     }
  }  

  
  const editCommentHandler = async (id, fields) => {
      try{
        const response = await editComment(id, fields) 
        console.log(response);
        console.log(publication);
        const editComments = publication.comments.map((comment) => comment._id === id 
        ? {...comment, content : fields.content} : comment )
        setPublication({...publication, comments : editComments})
      }catch(error) {
        console.log(error);
      }
        
  }

  const data = {createCommentHandler, deleteCommentHandler, editCommentHandler}

  return (
    <CommentContext.Provider value={data}>
        {children}
    </CommentContext.Provider>
  )
}


export const useComment = () => {
    const contextShare = useContext(CommentContext)
    if(!contextShare) {
        throw new Error('no existe el hook')
    }
    return contextShare
} 

