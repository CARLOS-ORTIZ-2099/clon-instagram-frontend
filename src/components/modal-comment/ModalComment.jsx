/* eslint-disable react/prop-types */

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useAuth } from "../../context/AuthProvider"
import { useState } from "react"
import { useFormFields } from "../../hooks/useFormFields"


export const ModalComment = ({isOpenModalComment, onCloseModalComment, commentSelect, deleteComent, editComment}) => {

    const {user} = useAuth() 
    const [isEditComment, setIsEditComment] = useState(false)
    const {fields, fieldsInputs} = useFormFields()

  return (
    <>
      <Modal  isCentered closeOnOverlayClick={false} isOpen={isOpenModalComment} onClose={onCloseModalComment}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader textAlign={'center'} borderBottom={'solid black 1px'}></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
                 {
                    user.id == commentSelect?.ownerComment?._id ?(
                        <>
                            <button onClick={() => setIsEditComment(true)}>editar</button>
                            <button onClick={() => deleteComent(commentSelect?._id)}> eliminar</button>
                        </>
                    ) 
                    : (<button>reportar</button>)
                } 

                    {
                      isEditComment && (
                        <form  onSubmit={(e) => editComment(e, commentSelect._id, fields)}>
                          <textarea onChange={fieldsInputs} defaultValue={commentSelect.content} name="content" id=""></textarea>
                          
                          <input type="submit" /> 
                        </form>
                      )
                    }
        
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
