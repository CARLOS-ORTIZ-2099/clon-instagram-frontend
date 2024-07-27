/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"


export const ProfileCard = ({infoUser, deleteFollowerHandler, followerHandler, onOpenModalFolloweds, onOpenModalFollowers}) => {

  const { user } = useAuth()    

  return (
    <Box border={'solid green 1px'} width={{base:'100%', lg: '50%'}} m={'50px auto'}
        display={'flex'} justifyContent={'center'} alignItems={'center'}
        flexWrap={'wrap'} flexDirection={{base:'column', lg:'row'}}
      
      >
          <Box border={'solid orange 3px'} flex={'1 1 0'}>
            <Avatar name={infoUser.username} size={ {base : 'xl', md : '2xl'} } /> 
          </Box>

          <VStack  border={'solid rgb(238, 63, 229) 3px '} width={{base:'100%', sm:'70%'}} flex={'3 1 0'} 
            sx={{'& > *' :  {marginTop : '10px'}}} alignItems={'start'}
          >
              <Box >
                <Box as="span" ml={{base:'0', md:'15px'}}>{infoUser.username}</Box>
                    {
                        infoUser._id != user.id ? ( 
                        infoUser.followers.find(follow =>  follow === user.id) 
                            ? <Button ml={'15px'} size={'sm'} onClick={() => deleteFollowerHandler(infoUser._id)}>dejar de seguir </Button>  
                            : <Button ml={'15px'} size={'sm'} onClick={() => followerHandler(infoUser._id)}>seguir</Button>
                        ) : 
                        <Button size={'sm'} ml={'15px'}>editar perfil</Button>   
                    }   
              </Box>

              <Box  border={'solid blue 2px'} sx={{'& > *' :  {marginLeft : {base:'0', md:'15px'}}}}>
                  <Box as="span" > {infoUser?.publications.length} publicaciones</Box> 

                  <Link  onClick={onOpenModalFollowers}> {infoUser?.followers.length} seguidores</Link>

                  <Link  onClick={onOpenModalFolloweds}> {infoUser?.followeds.length} seguidos</Link>
              </Box>

              <Box border={'solid blue 2px'} w={'100%'} sx={{'& > *' :  {marginLeft : {base:'0', md:'15px'}}}}
               >
                 <Text>{infoUser.fullname}</Text>
                 <Text>sin descripcion</Text>
              </Box>
          </VStack> 

    </Box>
  )
}