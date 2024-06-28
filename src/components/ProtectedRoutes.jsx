/* eslint-disable react-hooks/exhaustive-deps */

import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

/* con usenavigate hacemos redirecciones programaticas 
   cons el componente Navigate hacemos redirecciones a nivle de componentes
*/


export const ProtectedRoutes = () => {

  const {token, loading} = useAuth()
  console.log(token);


  if(loading){
    return <h1>...cargando</h1>
  }

  if(!token) {
    return <Navigate to='/login'/>
  }

  return (
    <div>
        <>
          <h2>este contenido es el padre que engloba todo</h2>
          <Outlet/>
        </>
        
    </div>
  )


}



