/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "../context/AuthProvider"
import { useNavigate , Link} from "react-router-dom"
import { useFormFields } from "../hooks/useFormFields"
import { useEffect } from "react"
import { Box, Input, FormControl, Button } from "@chakra-ui/react"
import img from '../assets/images/instagram1recorte.png'
import imgGoogle from '../assets/images/googlePlay.png'
import imgMicrosoft from '../assets/images/microsoft.png'
import imgInstagram from '../assets/images/instagramLogo2.png'
import styles from './login/login.module.css'
console.log(styles);


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
    // las propieddaes que recibe un componente de chakra Ui se le conocen como Props
    // esta spuede ser props de : margen y relleno : m => margin; bg => backGround, etc
    <Box border={ 'solid red 2px'}  display={'flex'} alignItems={'center'}
      justifyContent={'center'}  minHeight={'100vh'}
    >
      <Box border={ 'solid blue 3px'} display={'flex'} gap={'2rem'}   
      width={ {base : '100%', md : 'auto'} }
      height={ {base : '100vh', md : 'auto'}  }
      >

          <Box 
            display={ {base : 'none', md : 'block'} }
            flexGrow={1} flexShrink={1} flexBasis={0} 
            border={ 'solid coral 2px'}  
          >
                <img src={img} alt="" />
          </Box>

          <Box flexGrow={1} flexShrink={1} flexBasis={0} border={ 'solid green 3px'}>

           <div className="clasePersonalizada">
              <img  width={'200px'} src={imgInstagram} alt="" />

              <form onSubmit={sendData} noValidate style={{display : 'flex',flexDirection : 'column', gap : '1rem'}}>
                    {/* <input onChange={fieldsInputs} name="email" type="email" placeholder="email" />
                    <input onChange={fieldsInputs} name="password" type="text" placeholder="password" /> */}
                    <FormControl isRequired>
                    <Input size={'sm'} width={'80%'} onChange={fieldsInputs} name="email" type="email" placeholder="email" />
                  </FormControl>
                  <FormControl isRequired>
                    <Input width={'80%'} size={'sm'} onChange={fieldsInputs} name="password" type="text" placeholder="password" />
                  </FormControl>
                    <Button width={'80%'}  type="submit" colorScheme='blue'>iniciar sesion</Button>
              </form>

              <p>iniciar sesion con facebook</p>
           </div>

            <div className="clasepersonalizada2">
               <span>no tienes una cuenta ? </span> 
               <Link to='/'>registrarse</Link>
            </div> 
              
            <div className="clasepersonalizada3">
                <p>descarga la app</p>
                <img width={'100px'} src={imgGoogle} alt="" />
                <img width={'100px'} src={imgMicrosoft} alt="" />
            </div>

          </Box>

      </Box>
        

    </Box>
  )


}
