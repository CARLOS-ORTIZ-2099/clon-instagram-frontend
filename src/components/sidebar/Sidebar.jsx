/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"

import styles from './sidebar.module.css'
import img from '../../assets/images/instagramLogo2.png'

export const Sidebar = ({/* changeActive, */ onOpen, onPublicationOpen}) => { 

    const {logoutHandler, user} = useAuth()

    return (
    <nav className={styles.container}>
        <span className={styles.imgContainer}>
            <img className={styles.imgContainerImg} src={img} alt="" />
        </span>
        <ul className={styles.ulContainer}>
            <li >
                <Link to={'/home'}><i className={`bi bi-house-door-fill ${styles.sizeIcons}`}></i> 
                    <span className={styles.text}> incio</span>
                </Link>
            </li>
            <li onClick={onOpen} /* onClick={() => setActivateSearch(!activateSearch)} */>
                <i className={`bi bi-search ${styles.sizeIcons}`}></i> 
                <span className={styles.text}> buscar</span>
            </li>
            {/* { 
                activateSearch && <UserSearch/>
            } */}
            <li>
                <Link to={'/explore'}><i className={`bi bi-browser-safari ${styles.sizeIcons}`}></i> 
                    <span className={styles.text}> explorar</span>
                </Link>
            </li>
            
            <li onClick={/* changeActive */ onPublicationOpen}>
                <i className={`bi bi-plus-square-fill ${styles.sizeIcons}`}></i> 
                <span className={styles.text}> crear</span>
            </li>
            <li>
                <Link  to={`/${user.username}`}><i className={`bi bi-person-circle ${styles.sizeIcons}`}></i> 
                    <span className={styles.text}> perfil</span>
                </Link>
            </li>
            <li>
                <Link onClick={logoutHandler}> <i className={`bi bi-door-closed-fill ${styles.sizeIcons}`}></i> 
                    <span className={styles.text}> cerrar sesion</span>
                </Link>
            </li>
                      
        </ul>
    </nav>
  )
}


