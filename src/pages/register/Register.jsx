
import { Link } from "react-router-dom";
import { useFormFields } from "../../hooks/useFormFields";
import { useAuth } from "../../context/AuthProvider";

import imgGoogle from '../../assets/images/googlePlay.png'
import imgMicrosoft from '../../assets/images/microsoft.png'
import imgInstagram from '../../assets/images/instagramLogo2.png'
import styles from './register.module.css'


export const Register = () => {
  const {fields, fieldsInputs } = useFormFields() 
  const {registerHandler} = useAuth()

  const sendData = (e) => {
      e.preventDefault()
      registerHandler(fields)
  }

  return (
    <div className={styles.containerMain}>
      <div className={styles.containerRegister}>
          <div className={styles.containerForm}>
              <div className={styles.containerFormChildren1}>
                <img  width={'200px'} src={imgInstagram} alt="" />

                <p >Regístrate para ver fotos y vídeos de tus amigos.</p>
                
                <form onSubmit={sendData} noValidate className={styles.form}>
                    <input className={styles.input} onChange={fieldsInputs} name="fullname" type="text" placeholder="name"/>
                    <input className={styles.input} onChange={fieldsInputs} name="username"  type="text" placeholder="username"/>
                    <input className={styles.input} onChange={fieldsInputs} name="email" type="email" placeholder="email" />
                    <input className={styles.input} onChange={fieldsInputs} name="password" type="text" placeholder="password" />
                    <input className={styles.button} type="submit" value='send data'/>
                    <p style={{borderTop : 'solid black 1px'}}>
                    </p>
                </form>
              
       
              </div>

              <div className={styles.containerFormChildren2}> 
                <span>¿Tienes una cuenta? </span> 
                <Link style={{textDecoration : 'none', color: '#0095f6'}} to='/login'> Inicia sesión</Link>
              </div>

              <div className={styles.containerFormChildren3}>
                <p>descarga la aplicacion.</p>
                <img width={'100px'} height={'30px'} src={imgGoogle} alt="" />
                <img width={'100px'} height={'30px'} src={imgMicrosoft} alt="" />
              </div>
          </div>
      </div>  
    </div>
  )
  
}
