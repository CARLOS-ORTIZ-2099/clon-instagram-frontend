/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import './modal-likes.css'
import { getLikePublication } from '../api/likePublication'
import { Link } from 'react-router-dom'

export const ModalLikes = (
  {setShowLikes, publicationId, setPublicationId}) => {

  const [likes, setLikes] = useState([])  
  const [loading, setLoading] = useState(false)  
    
  useEffect(() => {
        getLikes()
  }, [])  


  async function getLikes() {
    setLoading(true)
    try{
        const response = await getLikePublication(publicationId)
        console.log(response);
        setLikes(response.data.likes)
        setLoading(false)
    }catch(error) {
        console.log(error);
        setLoading(false)
    }
  }


  const closeModal = () => {
    setShowLikes(false)
    setPublicationId('')
  }



  return (
    <div className='modal-container'>
      {
        loading ? (<h2>cargando...</h2>) : ( <>
            <button onClick={() => closeModal()}>X</button>
        <h2>ModalLikes</h2>
        <ul>
            {
              likes.map(like => (
                <li key={like._id}>
                    <span>{like.ownerLike.fullname}----</span> 
                    <Link style={{color : 'aliceblue'}} to={`/${like.ownerLike.username}`}>----{like.ownerLike.username}</Link>
                </li>
              ))
            }
        </ul>
          
        </> )
      }
        
    </div>
  )
}
