/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"

import img from '../../assets/images/logo.png'
import { Box, Image } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faDoorOpen, faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faCompass, faSquarePlus, faUser } from "@fortawesome/free-regular-svg-icons"

export const Sidebar = ({ onOpen, onPublicationOpen}) => { 

    const {logoutHandler, user} = useAuth()

    return (
    <Box as="nav" display={'flex'} position={{base:'fixed', lg:'relative'}} zIndex={{base:'9999',lg:'auto'}}
        flexDirection={'column'} bg={'rgb(30, 91, 204)'} 
        
    >
        <Box border={'solid red 2px'} position={'fixed'} display={{base:'none', lg:'block'}}>
            <Image w={'50%'} src={img}/>
        </Box>

        <Box as="ul" border={'solid green 3px'} mt={'7rem'} h={{base:'6vh', lg:'60vh'}} display={'flex'} flexDirection={{base:'row', lg:'column'}}
        justifyContent={'space-around'} position={'fixed'} w={{base:'100%', lg:'350px'}} listStyleType={'none'} bg={{base:'gray', lg:'none'}}
        bottom={{base:'0', lg:'auto'}} alignItems={{base:'center', lg:'start'}}>

            <Box as="li" border={'solid red 1px'} ml={'10px'} >
                <Link to={'/home'}>
                    <FontAwesomeIcon  icon={faHouse} size="xl"/>
                    <Box as="span" display={{base:'none', lg:'inline'}} ml={'10px'}> incio</Box>
                </Link>
            </Box>

            <Box as="li"  onClick={onOpen} ml={'10px'} >
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl"/>
                <Box as="span" display={{base:'none', lg:'inline'}} ml={'10px'}> buscar</Box>
            </Box>
 
            <Box as="li" ml={'10px'}>
                <Link to={'/explore'}>
                    <FontAwesomeIcon icon={faCompass} size="xl" />
                    <Box as='span'  display={{base:'none', lg:'inline'}} ml={'10px'}> explorar</Box>
                </Link>
            </Box>
            
            <Box as="li" ml={'10px'}  onClick={onPublicationOpen}>
                <FontAwesomeIcon icon={faSquarePlus} size="xl"/> 
                <Box as="span"  display={{base:'none', lg:'inline'}} ml={'10px'}> crear</Box>
            </Box>

            <Box as="li" ml={'10px'}>
                <Link  to={`/${user.username}`}>
                    <FontAwesomeIcon icon={faUser} size="xl"/>
                    <Box as="span" display={{base:'none', lg:'inline'}} ml={'10px'}> perfil</Box>
                </Link>
            </Box>

            <Box as="li" ml={'10px'}>
                <Link onClick={logoutHandler}> 
                <FontAwesomeIcon icon={faDoorOpen}  size="xl"/> 
                    <Box as="span" display={{base:'none', lg:'inline'}} ml={'10px'}> cerrar sesion</Box>
                </Link>
            </Box>                     
        </Box>

    </Box>
  )
}


