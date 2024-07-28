/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {createfollower, unFollowUser } from "../../api/follower";
import { profileUser } from "../../api/auth";
import {Box, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { ModalFolloweds } from "../../components/modal-followeds/ModalFolloweds";
import { ModalFollowers } from "../../components/modal-followers.jsx/ModalFollowers";
import { ProfileCard } from "../../components/profile-card/ProfileCard";
import { ImagesContainer } from "../../components/grid-images-container/ImagesContainer";
import { PublicationImage } from "../../components/publication-image/PublicationImage";

export const Profile = () => { 
  const {username} = useParams()
  const [infoUser, setInfoUser] = useState(false)

  const profilehandler = async () => {
    const {data : {user}} = await profileUser(username)
    setInfoUser(user)
  }

  useEffect(() =>{
    profilehandler() 
  }, [username])


  const followerHandler = async(id) => {
    try {
      const response = await createfollower(id)
      console.log(response);
      const updateFollewers = [...infoUser.followers, response.data.seguidor._id]
      setInfoUser({...infoUser, followers : updateFollewers})
    }catch(error) {
      console.log(error);
    }
  }

  const deleteFollowerHandler = async(id) => {
      try{
        const response = await unFollowUser(id)
        console.log(response);
        const updateFollewers = infoUser.followers.filter((follower) => follower !== response.data.user._id)
        setInfoUser({...infoUser, followers : updateFollewers})

      }catch(error) {
        console.log(error);
      }
  }
  // estados para los modales de follower y followeds
  const { isOpen : isOpenModalFolloweds , onOpen : onOpenModalFolloweds, onClose : onCloseModalFolloweds } = useDisclosure()
  const { isOpen : isOpenModalFollowers, onOpen  : onOpenModalFollowers, onClose : onCloseModalFollowers } = useDisclosure()

  if(!infoUser) return <Spinner m={'0 auto'}
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />        
   
  return (
    <Box >
        <ProfileCard infoUser={infoUser} 
        deleteFollowerHandler={deleteFollowerHandler} 
        followerHandler={followerHandler} 
        onOpenModalFolloweds={onOpenModalFolloweds}
        onOpenModalFollowers={onOpenModalFollowers}
     />
      <ImagesContainer>
        {
          infoUser?.publications?.length > 0 ?
            (
              infoUser.publications.map((publication) => (              
                <PublicationImage key={publication._id} publication={publication}/>            
              ))
            ) 
            : (
                <Text> no hay nada para mostrar </Text>
            )
        } 
      </ImagesContainer>

      {
        isOpenModalFollowers && <ModalFollowers 
          isOpen={isOpenModalFollowers}
          onClose={onCloseModalFollowers}
          idQuery={infoUser._id}
          profilehandler={profilehandler}
        />
      }
      {
        isOpenModalFolloweds && <ModalFolloweds 
        isOpen = {isOpenModalFolloweds} 
        onClose={onCloseModalFolloweds}
        idQuery={infoUser._id}
        profilehandler={profilehandler}
        />
      }     
    </Box>
  )
}
