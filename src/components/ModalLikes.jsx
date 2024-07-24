/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import './modal-likes.css'
import { getLikePublication } from '../api/likePublication'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'

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
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'} borderBottom={'solid black 1px'}>Me gusta</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
              {
                loading? <Text>cargando...</Text> : (
                  <ul>
                    {
                      likes.map(like => (
                        <Text key={like._id}>
                            <span>{like.ownerLike.fullname}</span> 
                            <Link style={{color : 'aliceblue'}} to={`/${like.ownerLike.username}`}>----{like.ownerLike.username}</Link>
                        </Text>
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
