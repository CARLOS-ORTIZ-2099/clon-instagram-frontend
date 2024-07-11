import { usePublication } from "../context/PublicationProvider"
import { useFormFields } from "../hooks/useFormFields"


export const FormEdit = () => {

  const {setEditMode, publication, editPublicationHandler} = usePublication()
  const {fields, fieldsInputs} = useFormFields()   


  return (
    <div>
        <button onClick={() => setEditMode(false)}>cancelar</button>
        <form  onSubmit={(e) => editPublicationHandler(e, publication._id, fields)}>
            <textarea onChange={fieldsInputs} defaultValue={publication.content} name="content" id=""></textarea>
            <input onChange={fieldsInputs} name="file" type="file" />
            <input type="submit" /> 
        </form>
    </div>
  )


}
