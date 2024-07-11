/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react"
import { createComment, deletecomment, editComment } from "../api/comment"


const CommentContext = createContext()

export const CommentProvider = ({children}) => {

  const [changeComment, setChangeComment] = useState(false)

   const createCommentHandler = async (id, fields) => { 
    console.log(id, fields);
     try {
        const response = await createComment(id, fields)
        console.log(response);
        setChangeComment(!changeComment)
     }catch(error) {
        console.log(error);
     }
  }  

  const deleteCommentHandler = async (id) => {
      try{
        console.log(id); 
        const response = await deletecomment(id)
        console.log(response);
        setChangeComment(!changeComment)
      }catch(error) {
        console.log(error);
      }
  }
 

  const editCommentHandler = async (id, fields) => {
      try{
        const response = await editComment(id, fields) 
        console.log(response);
        setChangeComment(!changeComment)
      }catch(error) {
        console.log(error);
      }
        
  }

  const data = {createCommentHandler, deleteCommentHandler, editCommentHandler, changeComment}

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

