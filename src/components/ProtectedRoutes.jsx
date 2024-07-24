/* eslint-disable react-hooks/exhaustive-deps */

import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
/* import { Sidebar } from "./Sidebar"; */
import { ModalForPublication } from "./ModalForPublication";
import { useEffect, useState } from "react";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import { GridLayout } from "../layout/GridLayout";

/* con usenavigate hacemos redirecciones programaticas 
   cons el componente Navigate hacemos redirecciones a nivel de componentes
*/

export const ProtectedRoutes = () => {

  const {user, loading, isAunthenticated} = useAuth()
  //console.log(user, loading, isAunthenticated);
  /* const [activateModal, setActivateModal] = useState(false)  */

  // estado para interactuar con el buscador
/*   const [activateSearch, setActivateSearch] = useState(false)  */
  // useLocation hook que detecta las interacciones que halla con el routing
/*   const location = useLocation() */
  //console.log(location);
  // funcion para activar el modal de la publicacion
 /*  const changeActive = () => setActivateModal(!activateModal)  */
  
  

// este efecto se ejecutara cuando su lista de dependecias cambie, en este caso el hook loaction

/*   useEffect(() => {
    setActivateSearch(false)
  }, [location.key])
 */
  if(loading){
    return <h1>...cargando</h1>
  }

  if(!user && !isAunthenticated) {
    return <Navigate to='/login' replace/>
  }

  
  return (
    <ChakraProvider>
        <GridLayout>

        </GridLayout>
    </ChakraProvider>
  )


}



