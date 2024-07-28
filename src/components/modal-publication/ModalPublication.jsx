/* eslint-disable react/prop-types */
import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react"
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
          <ModalHeader textAlign={'center'} borderBottom={'solid black 1px'}>
            Publication
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
              <Box>
                  {
                    !isEditPublication && (
                      user.id == publication.ownerPublication._id ? 
                      <Box display={'flex'} justifyContent={'space-around'}>
                          <Button onClick={() => deletePublicationHandler(publication._id)} colorScheme='red'>
                            eliminar
                          </Button>
                          <Button onClick={() => setIsEditPublication(true)} colorScheme='blue'>
                            editar
                          </Button> 
                      </Box>
                    : <Button colorScheme='orange'>reportar</Button>
                    )

                  }
                    
                  {
                    isEditPublication && (
                      <Box as="form"  onSubmit={setEditPublication}>
                        <Input  onChange={fieldsInputs} name="file" type="file" />
                        <Textarea onChange={fieldsInputs} 
                            name="content" 
                            placeholder="escribe una descripcion..." 
                            defaultValue={publication.content}
                        />         
                        <Button marginLeft={'40%'} marginTop={2} type="submit">editar</Button>
                      </Box>
                    )
                  }                    
              </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )


}
