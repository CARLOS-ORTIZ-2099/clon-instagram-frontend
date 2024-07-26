import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"


export const PublicRoutes = () => {
const {user, loading,isAunthenticated} = useAuth() 


console.log(user, loading, isAunthenticated);
    if(loading){
      return <h1>...cargando</h1>
    }

   if(user && isAunthenticated) {
    return <Navigate to='/home' replace/>
   } 

  return (
    <div>
        <Outlet/>
    </div>
  )

}



