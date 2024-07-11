/* eslint-disable react-hooks/exhaustive-deps */

import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { Navbar } from "./Navbar";
import { usePublication } from "../context/PublicationProvider";
import { ModalForPublication } from "./ModalForPublication";

/* con usenavigate hacemos redirecciones programaticas 
   cons el componente Navigate hacemos redirecciones a nivel de componentes
*/


export const ProtectedRoutes = () => {

  const {user, loading, isAunthenticated} = useAuth()
  //console.log(user, loading, isAunthenticated);
  const {active} = usePublication()
 
  if(loading){
    return <h1>...cargando</h1>
  }

  if(!user && !isAunthenticated) {
    return <Navigate to='/login' replace/>
  }

  return (
    <div>
        <Navbar/>
        <>
          <h2>este contenido es el padre que engloba todo</h2>
          {
            active ? <ModalForPublication/>: ''
          }
          <Outlet/>
        </>
        
    </div>
  )


}



