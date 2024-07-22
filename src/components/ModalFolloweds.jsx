/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { unFollowUser, createfollower, getFolloweds } from "../api/follower";
import { useAuth } from "../context/AuthProvider";



export const ModalFolloweds = () => {

  const {id} = useParams()  
  const [loading, setLoading] = useState(false)
  const [followeds, setFolloweds] = useState([])
  const {user} = useAuth()

    useEffect(() => {
        petitionFollowers()
    }, [id])

    const petitionFollowers = async() => {
        setLoading(true)
        try{
            const {data} = await getFolloweds(id)
            console.log(data);
            setFolloweds(data)
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
            setFolloweds(previous =>  
              previous.map(followed => followed.followedUser._id === id 
                ? {...followed, followedUser :
                   {...followed.followedUser, followers : followed.followedUser.followers.filter(id => id !== user.id)

                   }  
                  } 
                : followed))
          }else {
              await createfollower(id)
              setFolloweds(previous => 
                previous.map(followed => followed.followedUser._id === id 
                  ? {...followed, followedUser : {...followed.followedUser, followers : [...followed.followedUser.followers, user.id]}} 
                  : followed)
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
            followeds?.map(followed => (
                <div style={{border : 'solid blue 1px'}} key={followed._id}>
                    <h2>username : {followed.followedUser.username}</h2>
                    <h2>fullname : {followed.followedUser.fullname}</h2>
                    {
                        followed.followedUser._id != user.id && 
                        (!followed.followedUser.followers.includes(user.id))
                        ? <button onClick={() => followerHandler(followed.followedUser._id, false)}>seguir</button>  
                        : followed.followedUser._id != user.id ?
                         <button onClick={() => followerHandler(followed.followedUser._id, true)}>dejar de seguir</button> : ''
                    }
                   
                </div>
            ) )
        }
    </div>
  )



}
