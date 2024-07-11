/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import Cookies from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"
import { loginUser, logoutUser, profileUser, registerUser, verifyToken } from "../api/auth"
import { useNavigate } from "react-router-dom"


export const AuthContext = createContext()  

export const AuthProvider = ({children}) => {


  const [user, setUser] = useState(false) 
  const [loading, setLoading] = useState(true)
  const [isAunthenticated, setIsAunthenticated] = useState(false)
  const [infoUser, setInfoUser] = useState(false)

  const navigate = useNavigate()
  
  // este useEffect servira para que cada que se cargue la pagina hacer una consulta al servidor con token actual, esto para verificar si hay un usuario autenticado, no es recomendable que setemos el el estado con el token que pueda haber en el navegador esto por que cualquier persona podria alterar el token desde el navegador

  useEffect(() => {
      async function checkLogin() {
        const cookieAuth = Cookies.get('_token') || false
        //console.log(cookieAuth);
        if(cookieAuth) {
          try {
            const response = await verifyToken(cookieAuth)
            //console.log(response);
            if(!response.data){
              setLoading(false)
              return
            } 
            setUser(response.data)  
            setIsAunthenticated(true)
            setLoading(false)

          }catch(error) {
            console.log('entro al catch en el front-end', error); 
           setLoading(false)
          }
        } else {
          setLoading(false)
        }
      }
      checkLogin()
    
  }, []) 


  const registerHandler = async (fields) => { 
    try {
      const response = await registerUser(fields)
      console.log(response);
      if(response.statusText === 'Created') {
        navigate('/login')
      }
    }catch(error) {
      console.log(error);
    }
  }


  const loginHandler = async (fields) => {
    try {
      const {data} = await loginUser(fields)
      console.log(data);      
      setUser(data)
      setLoading(false)
      setIsAunthenticated(true)
    }catch(error) {
      console.log(error);
    }
  }


  const logoutHandler = async () => {
      try {
        const response =  await logoutUser()
        console.log(response);
        if(response.statusText === 'OK') {
          setUser(false)
          setIsAunthenticated(false)
          setInfoUser(false)
        }
      }catch(error) {
        console.log(error); 
      }
  }

  const profilehandler = async (username) => {
    const {data : {user}} = await profileUser(username)
    setInfoUser(user)
  }

  const data = {setUser, user, loading, setLoading, 
              isAunthenticated, setIsAunthenticated,
              registerHandler, loginHandler, logoutHandler,
              profilehandler, infoUser
  }

  return (
    <AuthContext.Provider value={data}>
          {children}
    </AuthContext.Provider>
  )

}


export const useAuth = () => {
  const contextShare =  useContext(AuthContext)
  if(!contextShare) {
    throw new Error('no existe el hook')
  }
  return contextShare
}


