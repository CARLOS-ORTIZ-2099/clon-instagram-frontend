/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "../context/AuthProvider"
import { useNavigate , Link} from "react-router-dom"
import { useFormFields } from "../hooks/useFormFields"
import { useEffect } from "react"

export const Login = () => {

  const {fields, fieldsInputs} = useFormFields()
  const {loginHandler, isAunthenticated} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(isAunthenticated) navigate('/home')
  }, [isAunthenticated])

  const sendData = (e) => {
      e.preventDefault()
      loginHandler(fields) 
  }

  return (
    <div>
        <h2>login</h2>
        <form onSubmit={sendData} noValidate style={{display : 'flex',flexDirection : 'column', gap : '1rem'}}>
            <input onChange={fieldsInputs} name="email" type="email" placeholder="email" />
            <input onChange={fieldsInputs} name="password" type="text" placeholder="password" />
            <input  type="submit" value='send data'/>
        </form>
        <br/>
      <Link to='/'>registrarse</Link>
    </div>
  )


}
