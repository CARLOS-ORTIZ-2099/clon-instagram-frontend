import { usePublication } from "../context/PublicationProvider"
import { useFormFields } from "../hooks/useFormFields"


export const ModalForPublication = () => {
  const {createPublicationHandler}  = usePublication()  
  const {fields, fieldsInputs} = useFormFields()  


  return (
    <div>
            <form action="" onSubmit={(e) => createPublicationHandler(e, fields)}>
                <textarea onChange={fieldsInputs} name="content" id=""></textarea>
                <input onChange={fieldsInputs} name="file" type="file" />
                <input type="submit" />
            </form>
    </div>
  )
}





