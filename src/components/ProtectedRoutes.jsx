/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { ChakraProvider} from "@chakra-ui/react";
import { GridLayout } from "../layout/GridLayout";



export const ProtectedRoutes = () => {

  const {user, loading, isAunthenticated} = useAuth()

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



