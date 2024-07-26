import { useEffect, useState } from "react"
import { getPublicationsRandom } from "../../api/publication"
import { Link } from "react-router-dom"

import styles from './explore.module.css'

export const Explore = () => {

  const [publicationsRandom, setPublicationsRandom] = useState([])  

  useEffect(() => {
    getPublicationsHandler()
  }, [])

  const  getPublicationsHandler = async() => {
       const {data : {publications}} = await getPublicationsRandom()
       console.log(publications);
       setPublicationsRandom(publications)
  }



 if(publicationsRandom.length < 1) {
  return <div className={styles.linea}>cargando...</div>
 }  

  return (
    <div className={styles.galeria}>
        
        <div  className={styles.contenedorImagenes}>
        {
            publicationsRandom.length > 0 ? 
              (
                publicationsRandom.map((publication) => (
                  
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
