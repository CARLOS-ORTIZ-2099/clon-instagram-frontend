/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom"
import { usePublication } from "../context/PublicationProvider";
import { useEffect, useState } from "react";
import { FormEdit } from "../components/FormEdit";
import { useAuth } from "../context/AuthProvider";
import { useComment } from "../context/CommentProvider";
import { likePublication } from "../api/likePublication";
import { ModalLikes } from "../components/ModalLikes";



export const Publication = () => {

  const {idpublication} = useParams()
  const {getPublicationHandler, publication, deletePublicationHandler, setEditMode, editMode, created, setCreated} = usePublication()
  const {user} = useAuth()  
  const {deleteCommentHandler, changeComment, editCommentHandler, createCommentHandler} = useComment() 

  const [comment, setComment] = useState( {content : ''} )  
  const [isEdit, setIsEdit] = useState({editmode : false, id : ''})  

  const [showLikes, setShowLikes] = useState(false)
  const [publicationId, setPublicationId] = useState(undefined)


const changeState = (id)=> {
    setShowLikes(true)
    setPublicationId(id)
}


const changeStateEdit = (content, id) => {
    setIsEdit({...isEdit, editmode : true, id : id})
    setComment({content})
}


const changeContent = (e) => {
   
    setComment((p) => ({...p, [e.target.name] : e.target.value  }))

    if(e.target.value === '' && isEdit) {
        console.log('entro');
        setIsEdit({editmode : false, id : ''})
    }
        
}


 const deleteComent  =  (id) => {
     deleteCommentHandler(id) 
}


const sendEditOrCreateComment = (e) => {
    e.preventDefault()
    try {
        if(isEdit.editmode) {
            editCommentHandler(isEdit.id, comment)
        }else {
            createCommentHandler(idpublication, comment)
        }
        
    }catch(error) {
        console.log(error);
    }
    finally {
        setComment({content : ''})
        setIsEdit({editmode : false, id : ''})
    }
}

  useEffect(() => {
    getPublicationHandler(idpublication) 
    console.log(publication);
    console.log(user);
  },[created, changeComment])

  const sendLike = async(id) => {
    try {
      const response = await likePublication(id)
      console.log(response);
      setCreated(!created)
    }catch(error) {
      console.log(error);
    }
  }
  

 
  return (
    <>
        <div style={{display : 'flex', flexWrap: 'wrap', gap : '1rem'}}>
            <div>
                <img style={{width:'300px'}} src={'http://localhost:3000'+publication.file} alt="" />
            </div>
            <div>
                <span>dueño publicacion: {publication?.ownerPublication?.username}</span>
                <p>contenido: {publication.content}</p>
                <p onClick={() => changeState(publication._id)}>{ publication?.likes?.length > 0
                             ? `${publication.likes.length} me gusta` 
                            : 'Sé el primero en indicar que te gusta' }
                </p>
                        <button onClick={() => sendLike(publication._id)}>
                          {
                            publication?.likes?.find(like => like.ownerLike === user.id)?  '❌' : '♥'
                          } 
                      </button>
                <h2>-comentarios-</h2>
                {
                    publication?.comments?.length > 0 ? (
                        publication.comments.map((comment) => (
                            <div style={{border:'solid blue 1px'}}  key={comment._id}>
                                <p>dueño del comentario: {comment.ownerComment.username}</p>
                                <span>{comment.content}</span> -
                                <span>{comment.likes.length} me gusta</span>
                              {
                                user.id === comment.ownerComment._id ?(
                                    <>
                                        <button onClick={() => changeStateEdit(comment.content, comment._id)}>editar</button>
                                        <button onClick={() => deleteComent(comment._id)}>eliminar</button>
                                    </>
                                ) : (<button>reportar</button>)
                              }
                            </div>
                        
                        ))
                    ) 
                    : 'no hay comentarios'
                }
                <br/>
                {
                    user.id == publication?.ownerPublication?._id && (
                        <>
                             <button onClick={() => deletePublicationHandler(publication._id)}>eliminar</button>
                             <button onClick={() => setEditMode(true)}>editar</button> 
                        </>
                    )
                }
               
            </div>
        </div>

            <form action="" onSubmit={sendEditOrCreateComment}>
                <textarea
                    onChange={changeContent}  
                    placeholder="agrega un comentario" 
                    name="content" 
                    value={comment.content}
                    >             
                </textarea>
               {
                isEdit.editmode? <button >editar</button> : ''
               }
               {
                !isEdit.editmode && comment.content.length > 0 && <button>publicar</button>
               }
            </form>

        {   
           editMode  && <FormEdit /> 
        }

      {
        showLikes && <ModalLikes setShowLikes = {setShowLikes} publicationId = {publicationId} setPublicationId = {setPublicationId}/>
      }
    </>
  )


}



