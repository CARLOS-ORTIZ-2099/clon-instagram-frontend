/* eslint-disable react/prop-types */
import { usePublication } from "../context/PublicationProvider"
import { useFormFields } from "../hooks/useFormFields"


export const ModalForPublication = ({changeActive}) => {
  const {createPublicationHandler}  = usePublication()  
  const {fields, fieldsInputs} = useFormFields()  

  const sendData = (e) => {
    e.preventDefault()
    createPublicationHandler(fields)
    changeActive()
  }

  return (
    <div>   <button onClick={changeActive}>cancelar</button>
            <form action="" onSubmit={sendData}>
                <textarea onChange={fieldsInputs} name="content" id=""></textarea>
                <input onChange={fieldsInputs} name="file" type="file" />
                <input type="submit" />
            </form>
    </div>
  )
}





