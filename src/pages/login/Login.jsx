/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "../../context/AuthProvider"
import { useNavigate , Link} from "react-router-dom"
import { useFormFields } from "../../hooks/useFormFields"
import { useEffect } from "react"
import img from '../../assets/images/auth.png'
import imgGoogle from '../../assets/images/googlePlay.png'
import imgMicrosoft from '../../assets/images/microsoft.png'
import imgInstagram from '../../assets/images/logo.png'
import styles from './login.module.css'
import { AbsoluteCenter, Box, Center, Divider, Image, Input, Text, VStack } from "@chakra-ui/react"

export const Login = () => {

  const {fields, fieldsInputs} = useFormFields()
  const {loginHandler, isAunthenticated} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(isAunthenticated) navigate('/home')
  }, [isAunthenticated])

  const sendData = (e) => {
      e.preventDefault()
      loginHandler(fields) 
  }

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}
         minHeight={'100vh'} textTransform={'capitalize'} 
         /* border={'solid magenta 3px'} */>
      
        <Box display={'flex'}  gap={'2rem'} width={{base:'100%', md:'auto'}} height={{base: '100vh', md:'auto'}}>

            <Box flex={'1 1 0'} display={{base:'none', md:'block'}} /* border={'solid red 3px'} */>
                <Image src={img} boxSize={'100%'} /* objectFit={'contain'} *//>
            </Box>

            <VStack justifyContent={'space-around'}  flex={'1 1 0'} /* border={'solid blue 3px'} */>
              <Box width={'100%'} p={'1.2rem'} textAlign={'center'}
                boxShadow={{base : 'none', sm:'0px 4px 8px rgba(0, 0, 0, 0.2)'}}>
                  <Image src={imgInstagram} w={'200px'} m={'0 auto'}/>

                  <form className={styles.form} onSubmit={sendData} noValidate >
                      <Input h={'38px'} onChange={fieldsInputs} name="email" type="email" placeholder="email" />
                      <Input h={'38px'} onChange={fieldsInputs} name="password" type="text" placeholder="password" />
                      <input className={styles.button} type="submit" value='iniciar sesion'/>
                      <Box position='relative' padding='5'>
                        <Divider />
                        <AbsoluteCenter bg='white' px='4'>
                          o
                        </AbsoluteCenter>
                    </Box>
                  </form>        
                  <Text className={styles.formParagraph}>iniciar sesion con facebook</Text>
              </Box>

              <Center p={'1rem'} mt={'10px'} fontSize={'small'} width={'100%'}boxShadow={{base : 'none', sm:'0px 4px 8px rgba(0, 0, 0, 0.2)'}}>
                <span>¿no tienes una cuenta? </span>  
                <Link style={{textDecoration : 'none', color: '#0095f6'}} to='/'> registrate</Link>
              </Center> 
                
              <Box fontSize={'small'} p={'1rem'} width={'100%'} textAlign={'center'}
                /* border={'solid coral 2px'} */>
                  <Text mb={'10px'}>descarga la aplicacion</Text>
                  <Box display={'flex'} justifyContent={'center'} gap={'10px'} >
                    <img width={'100px'} height={'30px'} src={imgGoogle} alt="" />
                    <img width={'100px'} height={'30px'} src={imgMicrosoft} 
                  />
                  </Box>
              </Box>
            </VStack>
        </Box>  

    </Box>
  )
}


      
