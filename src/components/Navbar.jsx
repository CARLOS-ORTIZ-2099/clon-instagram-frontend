import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { usePublication } from "../context/PublicationProvider"



export const Navbar = () => {

    const {logoutHandler, user} = useAuth()
    const {changeActive} = usePublication()
   

    return (
    <nav>
        <ul>
            <li>
                <Link to={'/home'}>incio</Link>
            </li>
            <li><Link>buscar</Link></li>
            <li><Link>explorar</Link></li>
            <li><Link>reels</Link></li>
            <li><Link>mensajes</Link></li>
            <li><Link>notificaciones</Link></li>
            <li><Link onClick={changeActive}>nueva publicacion</Link></li>
            <li><Link to={`/${user.username}`}>perfil</Link></li>
            <li><Link onClick={logoutHandler}>cerrar sesion</Link></li>
                      
        </ul>
    </nav>
  )
}


