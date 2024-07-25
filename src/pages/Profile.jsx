/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useParams } from "react-router-dom";
import {createfollower, unFollowUser } from "../api/follower";
import { profileUser } from "../api/auth";
import styles from './profile/profile.module.css'
import { Avatar } from "@chakra-ui/react";


export const Profile = () => {
  const { user } = useAuth()   
  const {username} = useParams()
  const [infoUser, setInfoUser] = useState(false)

  const profilehandler = async () => {
    const {data : {user}} = await profileUser(username)
    setInfoUser(user)
  }

  useEffect(() =>{
    profilehandler() 
    /* console.log(infoUser);
    console.log(user); */
  }, [username])


  const followerHandler = async(id) => {
    try {
      const response = await createfollower(id)
      console.log(response);
      const updateFollewers = [...infoUser.followers, response.data.seguidor._id]
      setInfoUser({...infoUser, followers : updateFollewers})
    }catch(error) {
      console.log(error);
    }
  }

  const deleteFollowerHandler = async(id) => {
      try{
        const response = await unFollowUser(id)
        console.log(response);
        const updateFollewers = infoUser.followers.filter((follower) => follower !== response.data.user._id)
        setInfoUser({...infoUser, followers : updateFollewers})

      }catch(error) {
        console.log(error);
      }
  }

  if(!infoUser) {
    return <h1>cargando</h1>
  }




  return (
    <div>

      <div className={styles.contenedorInfouser}>
          <div className={styles.child1}>
            <Avatar name={infoUser.username} size={ {base : 'xl', md : '2xl'} } /> 
          </div>

          <div className={styles.child2}>
              <div>
                <h2> welcome {infoUser.username}</h2>
                <button>editar perfil</button>
              </div>

              <div>
                  <span> {infoUser?.publications.length} publicaciones - </span> 
                  <Link to={`/${infoUser.username}/${infoUser._id}/followers`}> {infoUser?.followers.length} seguidores-</Link>
                  <Link to={`/${infoUser.username}/${infoUser._id}/following`}> {infoUser?.followeds.length} seguidos</Link>
                  {
                    infoUser._id != user.id && ( 
                      infoUser.followers.find(follow =>  follow === user.id) ? 
                      <button onClick={() => deleteFollowerHandler(infoUser._id)}>dejar de seguir </button>  
                      : <button onClick={() => followerHandler(infoUser._id)}>seguir</button>
                    )
                
                  }
              </div>
              <div>
                 <h3>{infoUser.fullname}</h3>
                 <h2>sin descripcion</h2>
              </div>
          </div>

            
      </div>

      <div className={styles.contenedorImagenes}>
        {
             infoUser?.publications.length > 0 ?
              (
                infoUser.publications.map((publication) => (
                  
                    <Link to={'/p/'+publication._id} key={publication._id} className={styles.imagen}>
                      <img className={styles.img} src={'http://localhost:3000'+publication.file} alt="" />
                        <div className={styles.overlay}>
                            <span><i className="bi bi-heart-fill"></i> {publication.likes.length}</span>
                            <span><i className="bi bi-chat-fill"></i> {publication.comments.length}</span>
                        </div>
                    </Link>
                        
                    ))
                ) 
                : (
                    <h3>
                        no hay nada para mostrar
                    </h3>
                )
        } 
      </div>

       
      
    </div>
  )
}
