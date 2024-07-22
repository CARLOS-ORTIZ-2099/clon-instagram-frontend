import { useEffect, useState } from "react"
import { getPublicationsRandom } from "../api/publication"
import { Link } from "react-router-dom"



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

  return (
    <div>
            {
                publicationsRandom.length > 1 ? 
                (
                    publicationsRandom.map((publication) => (
                        <div key={publication._id}>
                            <img style={{width:'200px'}} src={'http://localhost:3000'+publication.file} alt="" />
                            <br/>
                            
                            <span>likes :  {publication.likes.length}</span>
                            <span> - comments :  {publication.comments.length}</span>
                            <button><Link to={'/p/'+publication._id}>see more</Link></button>
                        </div>
                    ))
                ) 
                : (
                    <h3>
                        no hay nada para mostrar
                    </h3>
                )
            }
    </div>
  )


}
