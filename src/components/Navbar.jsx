/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { UserSearch } from "./UserSearch"


export const Navbar = ({changeActive, setActivateSearch, activateSearch}) => {

    const {logoutHandler, user} = useAuth()


   
    return (
    <nav>
        <ul>
            <li>
            <Link to={'/home'}>incio</Link>
            </li>
            <li onClick={() => setActivateSearch(!activateSearch)}> buscar</li>
            {
                activateSearch && <UserSearch/>
            }
            <li><Link to={'/explore'}>explorar</Link></li>
            <li><Link>reels</Link></li>
            <li><Link>mensajes</Link></li>
            <li><Link>notificaciones</Link></li>
            <li onClick={changeActive}>nueva publicacion</li>
            <li><Link  to={`/${user.username}`}>perfil</Link></li>
            <li><Link onClick={logoutHandler}>cerrar sesion</Link></li>
                      
        </ul>
    </nav>
  )
}


