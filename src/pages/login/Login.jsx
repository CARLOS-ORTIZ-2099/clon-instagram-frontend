/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "../../context/AuthProvider"
import { useNavigate , Link} from "react-router-dom"
import { useFormFields } from "../../hooks/useFormFields"
import { useEffect } from "react"
import img from '../../assets/images/instagram1recorte.png'
import imgGoogle from '../../assets/images/googlePlay.png'
import imgMicrosoft from '../../assets/images/microsoft.png'
import imgInstagram from '../../assets/images/instagramLogo2.png'
import styles from './login.module.css'


console.log(styles);
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
    // las propieddaes que recibe un componente de chakra Ui se le conocen como Props
    // esta spuede ser props de : margen y relleno : m => margin; bg => backGround, etc
    <div className={styles.containerMain}>
      
      <div className={styles.containerLogin}
      >

          <div className={styles.containerImage}>
              <img src={img} alt=""  height={'95%'}/>
          </div>

          <div className={styles.containerForm}>

            <div className={styles.containerFormChildren1}>
                <img  width={'200px'} src={imgInstagram} alt="" />

                <form className={styles.form} onSubmit={sendData} noValidate >
                    <input className={styles.input} onChange={fieldsInputs} name="email" type="email" placeholder="email" />
                    <input className={styles.input} onChange={fieldsInputs} name="password" type="text" placeholder="password" />
                    <input className={styles.button} type="submit" value='iniciar sesion'/>
                    <p style={{borderTop : 'solid black 1px'}}>
                    </p>
                </form>
                
                <p className={styles.formParagraph}>iniciar sesion con facebook</p>
            </div>

            <div className={styles.containerFormChildren2}>
               <span>¿no tienes una cuenta ? </span> 
               <Link style={{textDecoration : 'none', color: '#0095f6'}} to='/'>registrate</Link>
            </div> 
              
            <div className={styles.containerFormChildren3}>
                <p>descarga la aplicacion</p>
                <img width={'100px'} height={'30px'} src={imgGoogle} alt="" />
                <img width={'100px'} height={'30px'} src={imgMicrosoft} alt="" />
            </div>

          </div>

      </div>
        
    </div>
  )


}
