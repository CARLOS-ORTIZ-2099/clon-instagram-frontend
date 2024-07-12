import { useState } from "react"


export const useFormFields = () => {

    const [fields, setFields]  = useState({})

    const fieldsInputs = ({target}) => {
        console.log(fields);
        setFields((previous) => ({...previous, [target.name]  : target.name == 'file'? target.files[0]: target.value}))
    }
    

    return {fields, fieldsInputs, setFields}
}
