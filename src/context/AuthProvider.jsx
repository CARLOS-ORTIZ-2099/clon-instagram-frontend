/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import Cookies from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext()  

export const AuthProvider = ({children}) => {

  const [token, setToken] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setLoading(false)
    setToken(Cookies.get('_token') || false)
  }, [])

  const data = {setToken, token, loading, setLoading}
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


