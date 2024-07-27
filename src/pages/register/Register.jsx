import { Link } from "react-router-dom";
import { useFormFields } from "../../hooks/useFormFields";
import { useAuth } from "../../context/AuthProvider";

import imgGoogle from '../../assets/images/googlePlay.png'
import imgMicrosoft from '../../assets/images/microsoft.png'
import imgInstagram from '../../assets/images/logo.png'
import { AbsoluteCenter, Box, Button, Divider, Image, Img, Input, Text, VStack } from "@chakra-ui/react";

export const Register = () => {
  const {fields, fieldsInputs } = useFormFields() 
  const {registerHandler} = useAuth()

  const sendData = (e) => {
      e.preventDefault()
      registerHandler(fields)
  }

  return (
    <Box  display={'flex'} justifyContent={'center'} minH={'100vh'} 
      alignItems={'center'} textTransform={'capitalize'}>
      <Box /* border={'solid blue 2px'} */  display={'flex'} h={'800px'}>
          <VStack  /* boxShadow={'0px 4px 8px rgba(0, 0, 0, 0.2)'} */
             textAlign={'center'} justifyContent={'space-evenly'}>
              <Box p={'1.2rem'} /* border={'solid red 1px'} */ boxShadow={{base : 'none', sm:'0px 4px 8px rgba(0, 0, 0, 0.2)'}} w={'100%'}>
                <Img w={'200px'}  src={imgInstagram} m={'0 auto'} />
                <Text fontSize={'lg'} fontWeight={'bold'}>Regístrate para ver fotos y vídeos de </Text>
                <Text fontSize={'lg'} fontWeight={'bold'}>tus amigos.</Text>
                <Box position='relative' padding='5'>
                  <Divider />
                  <AbsoluteCenter bg='white' px='4'>
                    o
                  </AbsoluteCenter>
                </Box>
                <Box as="form" onSubmit={sendData} display={'flex'} flexDirection={'column'} gap={'1rem'} p={'1rem 1rem 0'} noValidate >
                    <Input h={'38px'}onChange={fieldsInputs} name="fullname" type="text" placeholder="name"/>
                    <Input h={'38px'} onChange={fieldsInputs} name="username"  type="text" placeholder="username"/>
                    <Input h={'38px'} onChange={fieldsInputs} name="email" type="email" placeholder="email" />
                    <Input h={'38px'} onChange={fieldsInputs} name="password" type="text" placeholder="password" />
                    <Box > 
                      <Text fontSize={'xs'}>
                        Es posible que las personas que usan nuestro 
                      </Text>
                      <Text fontSize={'xs'}>
                      servicio hayan subido tu información de contacto 
                      </Text>
                      <Text fontSize={'xs'}>
                        a Instagram. Más información 
                      </Text>
                    </Box>
                    <Box > 
                      <Text fontSize={'xs'}>
                      Al registrarte, aceptas nuestras Condiciones, la 
                      </Text>
                      <Text fontSize={'xs'}>
                        Política de privacidad y la Política de cookies. 
                      </Text>
                    </Box>
                    <Button h={'35px'} borderRadius={'7px'} bg={'#4cb5f9'}
                      p={'.9rem'} fontWeight={'bolder'} color={'aliceblue'}
                    >registrarte</Button>
                </Box>
              </Box>

              <Box /* border={'solid green 2px'} */ boxShadow={{base : 'none', sm:'0px 4px 8px rgba(0, 0, 0, 0.2)'}} w={'100%'} p={'1.2rem'}> 
                <span>¿Tienes una cuenta? </span> 
                <Link style={{textDecoration : 'none', color: '#0095f6'}} to='/login'> Inicia sesión</Link>
              </Box>

              <Box fontSize={'small'} p={'1rem'} width={'100%'} textAlign={'center'}
                /* border={'solid coral 2px'} */>
                  <Text mb={'10px'}>descarga la aplicacion</Text>
                  <Box display={'flex'} justifyContent={'center'} gap={'10px'} >
                    <Image width={'100px'} height={'32px'} src={imgGoogle} alt="" />
                    <Image width={'100px'} height={'32px'} src={imgMicrosoft} 
                  />
                  </Box>
              </Box>
          </VStack>
      </Box>  
    </Box>
  )
  
}
