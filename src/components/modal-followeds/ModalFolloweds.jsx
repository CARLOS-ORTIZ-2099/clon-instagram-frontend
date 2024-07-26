/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { unFollowUser, createfollower, getFolloweds } from "../../api/follower";
import { useAuth } from "../../context/AuthProvider";
import { Avatar, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";



export const ModalFolloweds = ({isOpen, onClose, id, profilehandler}) => {


  const [loading, setLoading] = useState(false)
  const [followeds, setFolloweds] = useState([])
  const {user} = useAuth()

    useEffect(() => {
      petitionFollowers()
    }, [])

    const petitionFollowers = async() => {
        setLoading(true)
        try{
            const {data} = await getFolloweds(id)
            console.log(data);
            setFolloweds(data)
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
            setFolloweds(previous =>  
              previous.map(followed => followed.followedUser._id === id 
                ? {...followed, followedUser :
                   {...followed.followedUser, followers : followed.followedUser.followers.filter(id => id !== user.id)

                   }  
                  } 
                : followed))
            }
          else {
              await createfollower(id)
              setFolloweds(previous => 
                previous.map(followed => followed.followedUser._id === id 
                  ? {...followed, followedUser : {...followed.followedUser, followers : [...followed.followedUser.followers, user.id]}} 
                  : followed)
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
                      followeds.map(followed => (
                        <Box key={followed._id} display={'flex'} marginTop={2}>
                            <Box marginRight={2}>
                              <Link to={`/${followed.followedUser.username}`}>
                              <Avatar name={`${followed.followedUser.fullname}`}  /> 
                              </Link>
                              
                            </Box>

                            <Box>
                              <Text fontWeight={'bold'}>
                                <Link  to={`/${followed.followedUser.username}`}>{followed.followedUser.username}</Link>
                              </Text>                             
                                <Text>{followed.followedUser.fullname}</Text>
                            </Box>  
                            {
                              followed.followedUser._id != user.id && 
                              (!followed.followedUser.followers.includes(user.id))
                              ? <Button onClick={() => followerHandler(followed.followedUser._id, false)}>seguir</Button>  
                              : followed.followedUser._id != user.id ?
                              <Button onClick={() => followerHandler(followed.followedUser._id, true)}>dejar de seguir</Button> : ''
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
