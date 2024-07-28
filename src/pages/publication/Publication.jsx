/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom"
import { usePublication } from "../../context/PublicationProvider";
import { useEffect, useState } from "react";
import { ModalPublication } from "../../components/modal-publication/ModalPublication";
import { useAuth } from "../../context/AuthProvider";
import { useComment } from "../../context/CommentProvider";
import { likePublication } from "../../api/likePublication";
import { ModalLikes } from "../../components/modal-likes/ModalLikes";
import { useDisclosure } from "@chakra-ui/react";
import { ModalComment } from "../../components/modal-comment/ModalComment";
import { PublicationMain } from "../../components/Publication-main/PublicationMain";


export const Publication = () => {

  const {idpublication} = useParams()
  const {getPublicationHandler, publication, setPublication, setPublications, publications} = usePublication()
  const {user} = useAuth()  
  const {deleteCommentHandler, editCommentHandler, createCommentHandler} = useComment() 


const createComment = (e, comment) => {
    e.preventDefault()
    try {
      createCommentHandler(idpublication, {content:comment})
      e.target.reset()
    }catch(error) {
        console.log(error);
    }
}

const editComment = (e, id, fields) => {
  e.preventDefault()
  try{
    editCommentHandler(id, fields)
    onCloseModalComment()
  }catch(error) {
    console.log(error);
  }
}


// funcion para eliminar un comentario mio
const deleteComent = (id) => {
    deleteCommentHandler(id)
    onCloseModalComment()
} 


  useEffect(() => {
    getPublicationHandler(idpublication) 
    console.log(publication);
    /* console.log(user); */
  },[])

  
  // funcion para dar like o deslike  
  const sendLike = async(id) => {
      try {
        const response = await likePublication(id)
      /*   console.log(response);
        console.log(publication);
        console.log(publications);
        console.log(id); */

        if(response.status === 204) {
          // se borro like, deberiamos borrar el like de nuestro estado publication
          const updateLikes = publication.likes.filter((like) => like.ownerLike != user.id)
          setPublication({...publication, likes : updateLikes})
          // tambien debo modificar mi estado de publicaciones oara que este se actualize en el home con las cantidad de likes mas recientes

          const publicationUpdate = publications.map((pb) => pb._id === id 
          ? {...pb, likes : pb.likes.filter((like) => like.ownerLike != user.id)} 
          : pb
          )
          setPublications(publicationUpdate)


        }else if(response.status === 201) {
          // se creo el like, deberiamos insertar el like en nuestro estado publications
          const updateLikes = [...publication.likes, response.data.like]
          setPublication({...publication, likes : updateLikes})

          const publicationUpdate = publications.map((pb) => pb._id === id 
          ? {...pb, likes : [...pb.likes, response.data.like]} 
          : pb
          )
          setPublications(publicationUpdate)
        }
        
      }catch(error) {
        console.log(error);
      }
  }

  const { isOpen : isOpenModalOptions, onOpen : onOpenModalOptions, onClose : onCloseModalOptions } = useDisclosure()

  const { isOpen : isOpenModalComment, onOpen : onOpenModalComment, onClose: onCloseModalComment } = useDisclosure()

  const { isOpen : isOpenModalLike, onOpen : onOpenModalLike, onClose :onCloseModalLike } = useDisclosure()  
  // estado que captura el comentario de la publicacion que se este intentando edita/eliminar o reportar
  const [commentSelect, setCommentSelect]  = useState()

  const showModalComment = (comment) => {
      onOpenModalComment()
      console.log(comment.ownerComment._id);
      setCommentSelect(comment)
  }
  const showModalOptionsPublication = () => onOpenModalOptions()
  const showModalLikes = () => onOpenModalLike()

  return (
    <>
        <PublicationMain publication={publication}
          showModalOptionsPublication={showModalOptionsPublication}
          showModalComment={showModalComment}
          sendLike={sendLike}
          showModalLikes={showModalLikes}
          createComment={createComment}
        />

        {
          isOpenModalComment && <ModalComment 
          isOpenModalComment={isOpenModalComment} 
          onCloseModalComment={onCloseModalComment}
          commentSelect={commentSelect}
          deleteComent={deleteComent}  
          editComment={editComment}
        />
        }
        {
          isOpenModalLike && <ModalLikes
          isOpen={isOpenModalLike}
          onClose={onCloseModalLike}
          idPublication={idpublication} 
          />
        } 

        {
          isOpenModalOptions && <ModalPublication isOpen = {isOpenModalOptions} onClose={onCloseModalOptions} />
        }
    </>
  )

}



