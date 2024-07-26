/* eslint-disable react/prop-types */
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { usePublication } from "../../context/PublicationProvider"
import { useFormFields } from "../../hooks/useFormFields"
import { useAuth } from "../../context/AuthProvider"
import { useState } from "react"


export const ModalPublication = ({isOpen, onClose}) => {
  const {user} = useAuth() 
  const { publication, editPublicationHandler, deletePublicationHandler} = usePublication()
  const {fields, fieldsInputs} = useFormFields()   
  const [isEditPublication, setIsEditPublication] = useState(false)

  const setEditPublication = (e) => {
    e.preventDefault()
    editPublicationHandler(publication._id, fields)
    onClose()
  }



  return (
    <>
      <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader textAlign={'center'} borderBottom={'solid black 1px'}></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
                <div>
                    {
                      user.id == publication?.ownerPublication?._id ? (
                        <>
                            <Button onClick={() => deletePublicationHandler(publication._id)}>eliminar</Button>
                            <Button onClick={() => setIsEditPublication(true)}>editar</Button> 
                        </>
                    ):      <Button>reportar</Button>

                    }
                    {
                      isEditPublication && (
                        <form  onSubmit={setEditPublication}>
                          <textarea onChange={fieldsInputs} defaultValue={publication.content} name="content" id=""></textarea>
                          <input onChange={fieldsInputs} name="file" type="file" />
                          <input type="submit" /> 
                        </form>
                      )
                    }
                      

                </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )


}
