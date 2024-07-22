/* eslint-disable react/prop-types */
import { usePublication } from "../context/PublicationProvider"
import { useFormFields } from "../hooks/useFormFields"


export const FormEdit = ({setIsEditPublication}) => {

  const { publication, editPublicationHandler} = usePublication()
  const {fields, fieldsInputs} = useFormFields()   

  const setEditPublication = (e) => {
    e.preventDefault()
    editPublicationHandler(publication._id, fields)
    setIsEditPublication(false)
  }

  return (
    <div>
        <button onClick={() => setIsEditPublication(false)}>cancelar</button>
        <form  onSubmit={setEditPublication}>
            <textarea onChange={fieldsInputs} defaultValue={publication.content} name="content" id=""></textarea>
            <input onChange={fieldsInputs} name="file" type="file" />
            <input type="submit" /> 
        </form>
    </div>
  )


}
