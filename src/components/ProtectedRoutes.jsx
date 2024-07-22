/* eslint-disable react-hooks/exhaustive-deps */

import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { Navbar } from "./Navbar";
import { ModalForPublication } from "./ModalForPublication";
import { useEffect, useState } from "react";
import { UserSearch } from "./UserSearch";

/* con usenavigate hacemos redirecciones programaticas 
   cons el componente Navigate hacemos redirecciones a nivel de componentes
*/


export const ProtectedRoutes = () => {

  const {user, loading, isAunthenticated} = useAuth()
  //console.log(user, loading, isAunthenticated);
  const [activateModal, setActivateModal] = useState(false) 

  // estado para interactuar con el buscador
  const [activateSearch, setActivateSearch] = useState(false) 
  // useLocation hook que detecta las interacciones que halla con el routing
  const location = useLocation()

  const changeActive = () => setActivateModal(!activateModal) 


console.log(location);

// este efecto se ejecutara cuando su lista de dependecias cambie, en este caso el hook loaction
  useEffect(() => {
    
    setActivateSearch(false)
  
  }, [location.key])

  if(loading){
    return <h1>...cargando</h1>
  }

  if(!user && !isAunthenticated) {
    return <Navigate to='/login' replace/>
  }

  return (
    <div style={{display : 'flex', justifyContent : 'space-around'}}>
        <Navbar changeActive = {changeActive} setActivateSearch = {setActivateSearch} activateSearch = {activateSearch}/>
           
        <>
          {/* <h2>este contenido es el padre que engloba todo</h2> */}
          {
            activateModal && <ModalForPublication changeActive = {changeActive}/>
          }
          <Outlet/>
        </>
        
    </div>
  )


}



