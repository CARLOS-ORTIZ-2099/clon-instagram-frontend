
import { Link } from "react-router-dom";
import { useFormFields } from "../hooks/useFormFields";
import { instance } from "../libs/axiosConfig";

export const Register = () => {
  const {fields, fieldsInputs } = useFormFields() 

  

  async function sendData(e) {
    e.preventDefault()
    try {
      const response = await instance.post('/auth/register', fields)
      console.log(response);
    }catch(error) {
      console.log(error);
    }
   

  }


  return (
    <div>
        <h2>register</h2>
        <form onSubmit={sendData} noValidate style={{display : 'flex',flexDirection : 'column', gap : '1rem'}}>
            <input onChange={fieldsInputs} name="fullname" type="text" placeholder="name"/>
            <input onChange={fieldsInputs} name="username"  type="text" placeholder="username"/>
            <input onChange={fieldsInputs} name="email" type="email" placeholder="email" />
            <input onChange={fieldsInputs} name="password" type="text" placeholder="password" />
            <input  type="submit" value='send data'/>
        </form>
        <br/>
        <Link to='/login'>¿Tienes una cuenta? Inicia sesión</Link>
    </div>
  )
  
}
