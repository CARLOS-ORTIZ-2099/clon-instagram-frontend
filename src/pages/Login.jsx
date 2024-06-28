
import { useAuth } from "../context/AuthProvider"
import { useNavigate , Link} from "react-router-dom"
import { useFormFields } from "../hooks/useFormFields"
import { instance } from "../libs/axiosConfig"

export const Login = () => {


  const {fields, fieldsInputs} = useFormFields()
  const {setToken, setLoading} = useAuth()
  const navigate = useNavigate()


  async function sendData(e) {
    e.preventDefault()
    try {
      const {data} = await instance.post('/auth/login', fields,{withCredentials: true})
      console.log(data);
      setLoading(false)
      setToken(data.cookies)
      navigate('/home')
    }catch(error) {
      console.log(error);
    }
      
    
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
