/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, CardFooter, Heading, Button, Image, Text, Flex, Avatar, Box, IconButton, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { usePublication } from '../../context/PublicationProvider'
import { likePublication } from '../../api/likePublication'
import { createComment } from '../../api/comment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis , faHeart} from '@fortawesome/free-solid-svg-icons'
import {faHeart as whiteHeart, faComment, faPaperPlane} from '@fortawesome/free-regular-svg-icons'

 
export const CardPublication = ({publication, onOpen, setIdPublication}) => {

  const {publications, setPublications} = usePublication() 
  const {user} = useAuth()
  const [buttonsActive, setButtonsActive] = useState({})

    const handlerComment = ({target}) => {
        if( !buttonsActive[target.id] && target.value.trim().length > 0 ) {
          setButtonsActive({...buttonsActive, [target.id] : target.id})
        }

        else if(buttonsActive[target.id] && target.value.trim().length < 1) {
          const copy = {...buttonsActive}
          delete copy[target.id]
          setButtonsActive(copy)
        }
    }

    const sendComment = async (e, id) => {
          e.preventDefault()
          try{
            const {data : {comment}} = await createComment(id, {content : e.target.content.value})  
            console.log(comment);
            const copy = {...buttonsActive}
            delete copy[id]
            setButtonsActive(copy)
            console.log(publications);
            const updateComment = publications.map((publication) => publication._id === id ? 
                  {...publication, comments : [...publication.comments, comment]} 
                  : publication)
            setPublications(updateComment)
            e.target.reset()
          }catch(error) {
            console.log(error);
          }
    }

    const sendLike = async(id) => {
        try {
          const response = await likePublication(id)
          console.log(response);
          console.log(publications);
          if(response.status === 204) {
            // se borro like, deberiamos borrar el like de nuestro estado publications
            const updateLikes = publications.map((publication) => publication._id === id ? 
            {...publication, likes : publication.likes.filter(like => like.ownerLike != user.id) } : publication )
            setPublications(updateLikes)

          }else if(response.status === 201) {
            // se creo el like, deberiamos insertar el like en nuestro estado publications
            const updateLikes = publications.map((publication) => publication._id === id ? 
            {...publication, likes : [...publication.likes, response.data.like]} : publication)
            setPublications(updateLikes)
          }
          
        }catch(error) {
          console.log(error);
        }
    }

    const changeState = (id)=> {
      /* console.log(id); */
      onOpen()
      setIdPublication(id)
    }

    
  return (
    <Card border={'solid blue 1px'} maxW='md'>
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name={`${publication?.ownerPublication?.username}`}  />
              <Box>
                <Heading size='sm'> 
                  <Link to={`/${publication.ownerPublication.username}`}>{publication.ownerPublication.username}</Link> 
                </Heading>
                <Text>Creator, Chakra UI</Text>
              </Box>
            </Flex>

             <IconButton variant='ghost'colorScheme='gray' aria-label='See menu'>
                <FontAwesomeIcon icon={faEllipsis} />
            </IconButton>             
          </Flex>
        </CardHeader>

        <Image objectFit='cover' height={'400px'}
          src={'http://localhost:3000'+publication.file}
          alt='Chakra UI'
        />

        <CardBody border={'solid green 1px'} p={0}>
          <Box> 
              <Button onClick={() => sendLike(publication._id)}  variant='ghost' 
                leftIcon={ publication.likes.find(like => like.ownerLike === user.id) ? 
                  <FontAwesomeIcon icon={faHeart} style={{color: "#ef1f1f",}} size='xl'/> : <FontAwesomeIcon icon={whiteHeart} size='xl'/>   }>
              </Button>
      
              <Button  variant='ghost'>
                <Link to={'/p/'+publication._id}> <FontAwesomeIcon icon={faComment} size='xl'/> </Link>
              </Button>

              <Button  variant='ghost' leftIcon={<FontAwesomeIcon icon={faPaperPlane} rotation={270} size='xl'/>} >
              
              </Button>
          </Box>
            
            <Text ml={'16px'} onClick={ () => changeState(publication._id) }>{publication.likes.length} Me gusta </Text>
        </CardBody>

        <CardFooter display={'flex'} flexDirection={'column'}>
            <Text >
                <Text as='b'>{publication.ownerPublication.username}</Text> {publication.content}
            </Text>
            <Box>
            {
              publication.comments.length < 1 ? 
              <Text>se el primero en comentar</Text> 
              :<Link to={'/p/'+publication._id}>
                ver los {publication.comments.length} comentarios
              </Link> 
            }
            </Box>
            <form  onSubmit={(e) => sendComment(e, publication._id)}>
              <Box display={'flex'} >
                <Input variant='flushed' id={publication._id}  placeholder="agregar un comentario" onChange={handlerComment} name="content"  />
                  {
                    buttonsActive[publication._id] &&
                    <Button type='submit' color={'blue'} bg={'none'} >
                      publicar
                    </Button>
                  }       
              </Box>
            </form>
        </CardFooter>
    </Card> 
  )

}
