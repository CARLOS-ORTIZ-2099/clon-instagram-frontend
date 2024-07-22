import { useRef, useState } from "react"
import { useFormFields } from "../hooks/useFormFields"
import { searchUser } from "../api/auth"
import { Link } from "react-router-dom"


export const UserSearch = () => {

  const {fieldsInputs, fields} = useFormFields({username : ''})
  const [usersMatches, setUsersMatches] = useState([]) 
  const [ thereIsOneSeacrh, setThereIsOneSearch] = useState(false) 
  const ref = useRef()
  //console.log(fieldsInputs);

  const handlerSubmit = async(e) => {
    e.preventDefault()
    setThereIsOneSearch(true)
      try{
        const {data} = await searchUser(fields.username)
        console.log(data);
        setUsersMatches(data.response)
      }catch(error) {
        console.log(error);
      }
  }

  return (
    <div style={{border : 'solid blue 3px'}}> 
            <h1>UserSearch</h1> 

            <form onSubmit={handlerSubmit}>
                <input onChange={fieldsInputs} type="text" placeholder='search user'name="username" />
                <input type="submit" ref={ref} disabled={fields?.username?.length < 1 ? true : false }/>
            </form>

            <div>
                  <h3>responses :</h3>
                  {
                    !thereIsOneSeacrh ? (
                      <h3>no hay busqueda reciente</h3>
                    ) : (
                      
                        usersMatches.length > 0 ? (
                          usersMatches.map((user) => (
                            <div key={user._id}>
                                <Link to={'/'+user.username}>{user.username}</Link>
                                <h5>{user.fullname}</h5>
                                <h6>seguidores : {user.followers.length}</h6>
                            </div>
                          ))
                        ) : (<h3>no hay resultados</h3>)
                      

                    )
                  }
            </div>

    </div>
  )
}
