/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { getFollowers, unFollowUser, createfollower } from "../../api/follower";
import { useAuth } from "../../context/AuthProvider";
import { Avatar, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";


export const ModalFollowers = ({isOpen, onClose, idQuery, profilehandler}) => {

  const [loading, setLoading] = useState(false)
  const [followers, setFollowers] = useState([])
  const {user} = useAuth()

     useEffect(() => {
        petitionFollowers()
    }, [])

    const petitionFollowers = async() => {
        setLoading(true)
        try{
            const {data} = await getFollowers(idQuery)
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
                  <Box as="ul">
                    {
                      followers.map(follower => (
                        <Box key={follower._id} display={'flex'} marginTop={2} gap={'1rem'} alignItems={'center'}>
                            <Box marginRight={2}>
                              <Link to={`/profile/${follower.followerUser.username}`}>
                                <Avatar name={`${follower.followerUser.fullname}`}  /> 
                              </Link>    
                            </Box>

                            <Box>
                              <Text fontWeight={'bold'}>
                                <Link  to={`/profile/${follower.followerUser.username}`}>{follower.followerUser.username}</Link>
                              </Text>                             
                                <Text>{follower.followerUser.fullname}</Text>
                            </Box>  
                            {
                              follower.followerUser._id != user.id && 
                              (!follower.followerUser.followers.includes(user.id))? 
                              <Button onClick={() => followerHandler(follower.followerUser._id, false)} size={'sm'}>
                                  seguir
                              </Button>  
                              : follower.followerUser._id != user.id ?
                              <Button onClick={() => followerHandler(follower.followerUser._id, true)} size={'sm'}>
                                  dejar de seguir
                              </Button> : null
                            }    
                        </Box>
                      ))
                    }
                  </Box>
                )
              }  
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )

}
