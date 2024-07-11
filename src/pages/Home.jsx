/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"
import { usePublication } from "../context/PublicationProvider"
import { Link } from "react-router-dom"
import { useComment } from "../context/CommentProvider"
import { likePublication } from "../api/likePublication"
import { getPublications } from "../api/publication"
import { useAuth } from "../context/AuthProvider"
import { createComment } from "../api/comment"
import { ModalLikes } from "../components/ModalLikes"



export const Home = () => {  

  const {getPublicationsHandler, publications, page, hasMore, pending, setPublications} = usePublication() 
  //const {createCommentHandler} = useComment()
  const {user} = useAuth()
  const [buttonsActive, setButtonsActive] = useState([])
  const refButton = useRef(null)
  const [showLikes, setShowLikes] = useState(false)
  const [publicationId, setPublicationId] = useState(undefined)

  useEffect(() => {

      const observer = new IntersectionObserver(observerfunction)
      if(observer && refButton.current){
        observer.observe(refButton.current)
      }
      // funcion de limpieza que se ejecutara cuando el componente se desmonte
      // y cuando algun elemento de su lista de dependecias cambie, pero cuando
      // alguno de ellos cambie antes de ejecutar la logica del efecto primero
      // borra el efecto anterior creando asi un nuevo observador evitando asi 
      // salidas inesperadas
      console.log(publications);
      return () => { 
        
        if(observer) {
          observer.disconnect()
        }
      }
  }, [publications, pending]) 

  async function observerfunction(entries) {
    console.log(entries[0]);
    const firstEntry = entries[0]
      if(!pending) {
        console.log('falso');
      }
      if(pending){
        console.log('verdad');
      } 
      /* aqui lo que hacemos es ejecutar la funcion que se encargara de comunicarse 
         con el servidor siempre y cuando no halla una tarea pendiente
         esto lo hago con el fin de que aunque la ventana del navegador se interseque
         con mi elemento objetivo no hacer una llamada a mi servidor indiscriminadamente
         si hay una tarea pendiente, cuando la ejecucion anterior se complete podemos hacer una nueva peticion
      */
      if((firstEntry.isIntersecting && hasMore && !pending) ) {
       await getPublicationsHandler(page)
       
      }

  }


  const handlerComment = ({target}) => {
      const foundId = buttonsActive.find((el) => el === target.id)
      !foundId &&  target.value.trim().length > 0 ? setButtonsActive((p) => [...p, target.id])  :''  
      foundId &&  target.value.trim().length < 1 ? setButtonsActive(buttonsActive.filter(el => el !== foundId)) : ''
      

  }

  const sendComment = async (e, id) => {
        e.preventDefault()
        try{
          await createComment(id, {content : e.target.content.value}) 
          setButtonsActive(buttonsActive.filter(btn => btn !== id))
          const publicationsUpdates = await getPublications(1, publications.length)  
          console.log(publicationsUpdates);
          setPublications(publicationsUpdates.data.response) 
          e.target.reset()
        }catch(error) {
          console.log(error);
        }
  }


   const sendLike = async(id) => {
      try {
        const response = await likePublication(id)
        console.log(response);
        const publicationsUpdates = await getPublications(1, publications.length)  
        console.log(publicationsUpdates);
        console.log(page);
        setPublications(publicationsUpdates.data.response) 
        
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
                            buttonsActive.includes(publication._id) ?
                           <input  type="submit" value='publicar'/> :''
                           
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

