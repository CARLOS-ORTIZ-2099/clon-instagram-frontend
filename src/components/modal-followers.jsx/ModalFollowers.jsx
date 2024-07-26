/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getFollowers, unFollowUser, createfollower } from "../../api/follower";
import { useAuth } from "../../context/AuthProvider";
import { Avatar, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";



export const ModalFollowers = ({isOpen, onClose, id, profilehandler}) => {

  /* const {id} = useParams()  */ 
  const [loading, setLoading] = useState(false)
  const [followers, setFollowers] = useState([])
  const {user} = useAuth()

     useEffect(() => {
        petitionFollowers()
    }, [])

    const petitionFollowers = async() => {
        setLoading(true)
        try{
            const {data} = await getFollowers(id)
            console.log(data);
            setFollowers(data)
            setLoading(false)  
        }catch(error){
            console.log(error);
            setLoading(false)
        }
    }

    const followerHandler = async(id, isFollowing) => {
        try {
          if(isFollowing){
            await unFollowUser(id)
            setFollowers(previous =>  
              previous.map(follower => follower.followerUser._id === id 
                ? {...follower, followerUser :
                   {...follower.followerUser, followers : follower.followerUser.followers.filter(id => id !== user.id)}  
                  } 
                : follower))
          }else {
              await createfollower(id)
              setFollowers(previous => 
                previous.map(follower => follower.followerUser._id === id 
                  ? {...follower, followerUser : {...follower.followerUser, followers : [...follower.followerUser.followers, user.id]}} 
                  : follower)
              )
          }
        }catch(error) {
          console.log(error);
        }
    }

    const closeModalFolloweds = () => {
      onClose()
      profilehandler()
    }

  if(loading)  return <h2>cargando...</h2>

  return (
    <>
      <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={() => closeModalFolloweds()}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader textAlign={'center'} borderBottom={'solid black 1px'}>Me gusta</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
              {
                loading? <Text>cargando...</Text> : (
                  <ul>
                    {
                      followers.map(follower => (
                        <Box key={follower._id} display={'flex'} marginTop={2}>
                            <Box marginRight={2}>
                              <Link to={`/${follower.followerUser.username}`}>
                              <Avatar name={`${follower.followerUser.fullname}`}  /> 
                              </Link>
                              
                            </Box>

                            <Box>
                              <Text fontWeight={'bold'}>
                                <Link  to={`/${follower.followerUser.username}`}>{follower.followerUser.username}</Link>
                              </Text>                             
                                <Text>{follower.followerUser.fullname}</Text>
                            </Box>  
                            {
                              follower.followerUser._id != user.id && 
                              (!follower.followerUser.followers.includes(user.id))
                              ? <Button onClick={() => followerHandler(follower.followerUser._id, false)}>seguir</Button>  
                              : follower.followerUser._id != user.id ?
                              <Button onClick={() => followerHandler(follower.followerUser._id, true)}>dejar de seguir</Button> : ''
                            }    
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
