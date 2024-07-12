/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"
import { usePublication } from "../context/PublicationProvider"
import { Link } from "react-router-dom"
import { likePublication } from "../api/likePublication"
import { useAuth } from "../context/AuthProvider"
import { createComment } from "../api/comment"
import { ModalLikes } from "../components/ModalLikes"



export const Home = () => {  

  const {getPublicationsHandler, publications, page, hasMore, pending, setPublications} = usePublication() 
  const {user} = useAuth()
  const [buttonsActive, setButtonsActive] = useState({})
  const refButton = useRef(null)
  const [showLikes, setShowLikes] = useState(false)
  const [publicationId, setPublicationId] = useState(undefined)

  useEffect(() => {
      const observer = new IntersectionObserver(observerfunction)
      if(observer && refButton.current){
        observer.observe(refButton.current)
      }
      //console.log(publications);
      return () => {    
        if(observer) {
          observer.disconnect()
        }
      }
  }, [publications, pending]) 

  async function observerfunction(entries) {
      //console.log(entries[0]);
      const firstEntry = entries[0]
      if(!pending) {
        //console.log('falso');
      }
      if(pending){
        //console.log('verdad');
      } 
      if((firstEntry.isIntersecting && hasMore && !pending) ) {
       await getPublicationsHandler(page)
       
      }

  }


  const handlerComment = ({target}) => {
      if( !buttonsActive[target.id] && target.value.trim().length > 0 ) {
        setButtonsActive({...buttonsActive, [target.id] : target.id})
      }

      else if(buttonsActive[target.id] && target.value.trim().length < 1) {
        const copy = {...buttonsActive}
        delete copy[target.id]
        setButtonsActive(copy)
      }
  }

  const sendComment = async (e, id) => {
        e.preventDefault()
        try{
          const {data : {comment}} = await createComment(id, {content : e.target.content.value}) 
          console.log(comment);
          const copy = {...buttonsActive}
          delete copy[id]
          setButtonsActive(copy)
          console.log(publications);
          const updateComment = publications.map((publication) => publication._id === id ? 
                {...publication, comments : [...publication.comments, comment]} 
                : publication)
          setPublications(updateComment)
          e.target.reset()
        }catch(error) {
          console.log(error);
        }
  }


  const sendLike = async(id) => {
      try {
        const response = await likePublication(id)
        console.log(response);
        console.log(publications);
        if(response.status === 204) {
          // se borro like, deberiamos borrar el like de nuestro estado publications
          const updateLikes = publications.map((publication) => publication._id === id ? 
          {...publication, likes : publication.likes.filter(like => like.ownerLike != user.id) } : publication )
          setPublications(updateLikes)

        }else if(response.status === 201) {
          // se creo el like, deberiamos insertar el like en nuestro estado publications
          const updateLikes = publications.map((publication) => publication._id === id ? 
          {...publication, likes : [...publication.likes, response.data.like]} : publication)
          setPublications(updateLikes)
        }
        
      }catch(error) {
        console.log(error);
      }
  }

  const changeState = (id)=> {
    setShowLikes(true)
    setPublicationId(id)
  }


  return (
    <div>
      <h2>Home</h2>

      {
        publications?.map((publication) => (
            <div id={publication._id} style={{border:'solid blue 2px'}} key={publication._id}>
                  <Link to={`/${publication.ownerPublication.username}`}>{publication.ownerPublication.username}</Link>
                  <br/>
                  <div>
                      <img style={{width:'200px'}} src={'http://localhost:3000'+publication.file} alt="" />
                  </div>
                  <div>
                      <p onClick={() => changeState(publication._id)}>me gusta : {publication.likes.length}</p>
                      <button onClick={() => sendLike(publication._id)}>
                          {
                            publication.likes.find(like => like.ownerLike === user.id)?  '❌' : '♥'
                          } 
                      </button>
                      <p>{publication.ownerPublication.username} : {publication.content}</p>
                      {
                        publication.comments.length < 1 ? <p>
                          se el primero en comentar
                        </p> : 
                         <Link to={'/p/'+publication._id}>ver los {publication.comments.length} comentarios</Link> 
                      }
                        <br/>
                       <Link to={'/p/'+publication._id}>ver publicacion</Link> 
                      <form onSubmit={(e) => sendComment(e, publication._id)}>
                      
                         <textarea  id={publication._id}  placeholder="agregar un comentario" onChange={handlerComment} name="content">

                         </textarea>
                        {
                            buttonsActive[publication._id] &&
                           <input  type="submit" value='publicar'/> 
                           
                         } 
                      
                      </form>
                  </div>
            </div>
        ))
      }
      {
        hasMore && <button ref={refButton}>cargando...</button>
      } 

      {
        showLikes && <ModalLikes setShowLikes = {setShowLikes} publicationId = {publicationId} setPublicationId = {setPublicationId}/>
      }
    </div>
  )
}

/* la funcion de limpieza de react se ejcuta en 2 situaciones, cuando se
   desmonte el componente y cuando alguno de los elementos de su lista de
   dependecnia cambie, si pasa eso el efecto se ejecutara nuevamente pero la
   funcion de limpieza limpiara el efecto anterior, antes de ejecutar la
   logica nueva
*/
