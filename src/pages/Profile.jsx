/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { usePublication } from "../context/PublicationProvider";
import { Link, useParams } from "react-router-dom";
import {createfollower, unFollowUser } from "../api/follower";


export const Profile = () => {
  const { user, profilehandler, infoUser  } = useAuth()   
  const {created} = usePublication()
  const {username} = useParams()
  const [followUnFollow, setFollowUnFollow] = useState(false)

  useEffect(() =>{
    profilehandler(username) 
    console.log(infoUser);
    console.log(user);
  }, [created, followUnFollow])


  const followerHandler = async(id) => {
    try {
      const response = await createfollower(id)
      console.log(response);
      setFollowUnFollow(!followUnFollow)
    }catch(error) {
      console.log(error);
    }
  }

  const deleteFollowerHandler = async(id) => {
      try{
        const response = await unFollowUser(id)
        console.log(response);
        setFollowUnFollow(!followUnFollow)
      }catch(error) {
        console.log(error);
      }
  }

  if(!infoUser) {
    return <h1>cargando</h1>
  }




  return (
    <div>
       <h2> welcome {infoUser.username}</h2>
       <h3>{infoUser.fullname}</h3>
       <h3>{infoUser.email}</h3>
       <span> {infoUser?.publications.length} publicaciones - </span> 
       <Link to={`/${infoUser.username}/${infoUser._id}/followers`}> {infoUser?.followers.length} seguidores-</Link>
       <Link to={`/${infoUser.username}/${infoUser._id}/following`}> {infoUser?.followeds.length} seguidos</Link>
       <br/>
       {
        infoUser._id != user.id && ( 
          infoUser.followers.find(follow =>  follow._id === user.id) ? 
          <button onClick={() => deleteFollowerHandler(infoUser._id)}>dejar de seguir </button>  
          : <button onClick={() => followerHandler(infoUser._id)}>seguir</button>
        )
          
       }
      
       <div style={{display: 'flex', flexWrap:'wrap', gap:'1rem'}}>
        {
          infoUser?.publications.length > 0 ? (
              infoUser.publications.map((publication) => {
              return <div key={publication._id}>
                  <img style={{width : '250px'}} src={'http://localhost:3000'+publication.file} alt="" />
                  <br/>
                <Link to={'/p/'+publication._id}>see more</Link>
              </div>
              })
          ) : (<h4>sin publicaciones</h4>)
        }
       </div>
    </div>
  )
}
