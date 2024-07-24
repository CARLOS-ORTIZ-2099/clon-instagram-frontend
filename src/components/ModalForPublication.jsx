/* eslint-disable react/prop-types */
import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react"
import { usePublication } from "../context/PublicationProvider"
import { useFormFields } from "../hooks/useFormFields"
 

export const ModalForPublication = ({isPublicationOpen, onPublicationClose}) => {
  const {createPublicationHandler}  = usePublication()  
  const {fields, fieldsInputs} = useFormFields()  

  const sendData = (e) => {
    e.preventDefault()
    createPublicationHandler(fields)
    onPublicationClose()
  }


  return ( 
    <Modal isCentered closeOnOverlayClick={false} isOpen={isPublicationOpen} onClose={onPublicationClose}>
      <ModalOverlay />
      <ModalContent >
        <ModalHeader textAlign={'center'} borderBottom={'solid black 1px'}>Crea una nueva publicación</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box>   
              <form onSubmit={sendData}>
                  <Input onChange={fieldsInputs} name="file" type="file" />
                  <Textarea onChange={fieldsInputs} name="content" id=""
                    placeholder="escribe una descripcion..."
                  />
                  
                  <Button marginLeft={'40%'} marginTop={2} type="submit">crear</Button>
              </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}





