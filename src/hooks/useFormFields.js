import { useState } from "react"


export const useFormFields = (data) => {

    const [fields, setFields]  = useState(data || {})

    const fieldsInputs = ({target}) => {
        console.log(fields);
        setFields((previous) => ({...previous, [target.name]  : target.name == 'file'? target.files[0]: target.value}))
    }
    

    return {fields, fieldsInputs, setFields}
}
