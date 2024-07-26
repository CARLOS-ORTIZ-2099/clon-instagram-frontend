/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'

import { getLikePublication } from '../../api/likePublication'
import { Link } from 'react-router-dom'
import { Avatar, Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'

export const ModalLikes = ({isOpen, onClose, idPublication}) => {

  const [likes, setLikes] = useState([])  
  const [loading, setLoading] = useState(false)  
    
  useEffect(() => {
    getLikes()
  }, [])  


  async function getLikes() {
    setLoading(true) 
    try{
        const response = await getLikePublication(idPublication)
        console.log(response);
        setLikes(response.data.likes)
        setLoading(false)
    }catch(error) {
        console.log(error);
        setLoading(false)
    }
  }


  return (
    <>
      <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader textAlign={'center'} borderBottom={'solid black 1px'}>Me gusta</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
              {
                loading? <Text>cargando...</Text> : (
                  <ul>
                    {
                      likes.map(like => (
                        <Box key={like._id} display={'flex'} marginTop={2}>
                            <Box marginRight={2}>
                              <Link to={`/${like.ownerLike.username}`}>
                              <Avatar name={`${like.ownerLike.fullname}`}  /> 
                              </Link>
                               
                            </Box>
                            <Box>
                              <Text fontWeight={'bold'}>
                                <Link  to={`/${like.ownerLike.username}`}>{like.ownerLike.username}</Link>
                              </Text>                             
                                <Text>{like.ownerLike.fullname}</Text>
                            </Box>      
                        </Box>
                      ))
                    }
                  </ul>
                )
              }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
    
  
}
