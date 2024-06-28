import { useState } from "react"


export const useFormFields = () => {

    const [fields, setFields]  = useState({})

    const fieldsInputs = ({target}) => {
        setFields((previous) => ({...previous, [target.name] : target.value}))
    }
    

    return {fields, fieldsInputs, setFields}
}
