/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getFollowers, unFollowUser, createfollower } from "../api/follower";
import { useAuth } from "../context/AuthProvider";



export const ModalFollowers = () => {

  const {id} = useParams()  
  const [loading, setLoading] = useState(false)
  const [followers, setFollowers] = useState([])
  const {user} = useAuth()

    useEffect(() => {
        petitionFollowers()
    }, [id])

    const petitionFollowers = async() => {
        setLoading(true)
        try{
            const {data} = await getFollowers(id)
            console.log(data);
            setFollowers(data)
            setLoading(false)  
        }catch(error){
            console.log(error);
            setLoading(false)
        }
    }

    const followerHandler = async(id, isFollowing) => {
        try {
          if(isFollowing){
            await unFollowUser(id)
            setFollowers(previous =>  
              previous.map(follower => follower.followerUser._id === id 
                ? {...follower, followerUser :
                   {...follower.followerUser, followers : follower.followerUser.followers.filter(id => id !== user.id)}  
                  } 
                : follower))
          }else {
              await createfollower(id)
              setFollowers(previous => 
                previous.map(follower => follower.followerUser._id === id 
                  ? {...follower, followerUser : {...follower.followerUser, followers : [...follower.followerUser.followers, user.id]}} 
                  : follower)
              )
          }
        }catch(error) {
          console.log(error);
        }
    }
    

  if(loading)  return <h2>cargando...</h2>

  return (
    <div>
        { 
            followers?.map(follower => (
                <div style={{border : 'solid blue 1px'}} key={follower._id}>
                    <h2>username : {follower.followerUser.username}</h2>
                    <h2>fullname : {follower.followerUser.fullname}</h2>
                    {
                        follower.followerUser._id != user.id && 
                        (!follower.followerUser.followers.includes(user.id))
                        ? <button onClick={() => followerHandler(follower.followerUser._id, false)}>seguir</button>  
                        : follower.followerUser._id != user.id ?
                         <button onClick={() => followerHandler(follower.followerUser._id, true)}>dejar de seguir</button> : ''
                    }
                   
                </div>
            ) )
        }
    </div>
  )



}
