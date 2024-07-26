/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom"
import { usePublication } from "../../context/PublicationProvider";
import { useEffect, useState } from "react";
import { ModalPublication } from "../../components/modal-publication/ModalPublication";
import { useAuth } from "../../context/AuthProvider";
import { useComment } from "../../context/CommentProvider";
import { likePublication } from "../../api/likePublication";
import { ModalLikes } from "../../components/modal-likes/ModalLikes";
import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Input, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { ModalComment } from "../../components/modal-comment/ModalComment";



export const Publication = () => {

  const {idpublication} = useParams()
  const {getPublicationHandler, publication, setPublication, setPublications, publications} = usePublication()
  const {user} = useAuth()  
  const {deleteCommentHandler, editCommentHandler, createCommentHandler} = useComment() 

  // estados para los comentarios
  const [comment, setComment] = useState( {content : ''} ) 


const createComment = (e) => {
    e.preventDefault()
    try {
      createCommentHandler(idpublication, comment)
      setComment({content : ''})
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

  useEffect(() => {
    getPublicationHandler(idpublication) 
    console.log(publication);
    console.log(user);
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

 
   // funcion para eliminar un comentario mio
  const deleteComent = (id) => {
    deleteCommentHandler(id)
    onCloseModalComment()
  } 

  // funcion para corroborar si hay caracteres en la caja de formulario
  // y cambiar el estado de mi comentario
  const changeContent = (e) => {
    setComment((p) => ({...p, [e.target.name] : e.target.value  }))
 
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isOpen : isOpenModalComment, 
          onOpen : onOpenModalComment, 
          onClose: onCloseModalComment } = useDisclosure()

  const { isOpen : isOpenModalLike, onOpen : onOpenModalLike, onClose :onCloseModalLike } = useDisclosure()  
  // estado que captura el commentario de la publicacion que se este intentando edita/eliminar o reportar
  const [commentSelect, setCommentSelect]  = useState()
  



  return (
    <>
      <Box border={'solid red 5px'} display={'flex'} flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          minH={'70vh'}
          width={{base : '100%', md : '60%'}}
          
        >
            <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '60%' }}
              src={`http://localhost:3000${publication.file}`}
              alt='Caffe Latte'
            />

            <Stack border={'solid green 2px'} maxHeight={'70vh'} overflowY={'auto'} width={{base : '100%', md : '60%'}}>

              <CardBody border={'solid red 2px'}>
                <Heading size='md' display={'flex'} justifyContent={'space-between'}>
                  <Text>{publication?.ownerPublication?.username}</Text>
                  <i onClick={onOpen} className="bi bi-three-dots"></i>  
                  {/* esto solo aparecera cuando el usuario haga clik en el icono superior */}
                  {
                    isOpen && <ModalPublication isOpen = {isOpen} onClose={onClose} />
                  }
           
                </Heading>

                <Text py='2'>
                  {publication?.ownerPublication?.username}: {publication.content}
                </Text>
                {
                   publication?.comments?.length > 0 ?(
                    publication.comments.map((comment) => (
                        <Box border={'solid blue 2px'}   key={comment._id}>
                            <Text> {comment.ownerComment.username}</Text>
                            <Text>{comment.content}</Text> 
                            {/* cuando el usuario clicke en este icono aparecera una ventana modal indicando que accion desea hacer */}
                              <i onClick={() => {
                                onOpenModalComment()
                                console.log(comment.ownerComment._id);
                                setCommentSelect(comment)
                              }} className="bi bi-three-dots"></i>
                              {
                                isOpenModalComment && <ModalComment 
                                  isOpenModalComment={isOpenModalComment} 
                                  onCloseModalComment={onCloseModalComment}
                                  commentSelect={commentSelect}
                                  deleteComent={deleteComent}  
                                  editComment={editComment}
                                />
                              } 
                        </Box>
                    
                    ))
                   ) 
                   : <Text>no hay comentarios</Text>
                }
                
                
              </CardBody>

              <CardFooter display={'flex'} flexDirection={'column'}   gap={'8px'} marginBottom={'30px'}>

                  <Box display={'flex'} justifyContent={'center'} gap={'10px'}>
                      <Button variant='ghost' onClick={() => sendLike(publication._id)}>
                          {
                            publication?.likes?.find(like => like.ownerLike === user.id)?  
                            <i className="bi bi-x-circle-fill"></i> : <i className="bi bi-heart-fill"></i> 
                          } 
                      </Button>
                      <Button variant='ghost'>
                          <i className="bi bi-chat-fill"></i>
                      </Button>
                  </Box>
                 

                  <Box display={'flex'} justifyContent={'center'} gap={'10px'}>
                    <Text onClick={onOpenModalLike}>{ publication?.likes?.length > 0
                              ? `${publication.likes.length} me gusta` 
                              : 'Sé el primero en indicar que te gusta' }
                    </Text>
                          {
                            isOpenModalLike && <ModalLikes
                            isOpen={isOpenModalLike}
                            onClose={onCloseModalLike}
                            idPublication={idpublication} 
                            />
                          } 
                    <Text>
                        {
                          publication?.comments?.length > 0 ? `${publication.comments.length} comentarios` : 'se el primero en comentar'
                        }
                    </Text>
                  </Box>

                  <Box>
                    <form action="" onSubmit={createComment}>
                      <Input
                          variant='flushed'   
                          onChange={changeContent}  
                          placeholder="agrega un comentario" 
                          name="content" 
                          value={comment.content}
                          >             
                      </Input>
                        {
                           comment.content.length > 0 && <Button type="submit">publicar</Button>
                        }
                    </form>
                  </Box>

              </CardFooter>

            </Stack>

        </Card>
      </Box>
    </>
  )

}



