/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { createPublication } from "../../api/publication";

export const ModalCreatePublication = ({
  isPublicationOpen,
  onPublicationClose,
}) => {
  const [image, setImage] = useState({ file: "", result: "" });

  const sendData = async (e) => {
    e.preventDefault();
    if (!image.file) {
      return alert("la imagen es obligatorio");
    }
    const formData = new FormData();
    formData.append("file", image.file);
    formData.append("content", e.target.content.value);
    console.log(Object.fromEntries(formData));
    try {
      const response = await createPublication(formData);
      console.log(response);
      onPublicationClose();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhoto = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.addEventListener("load", (evt) => {
      setImage({ file, result: evt.target.result });
    });
  };

  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      isOpen={isPublicationOpen}
      onClose={onPublicationClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"} borderBottom={"solid black 1px"}>
          Crea una nueva publicación
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box>
            <Box as="form" onSubmit={sendData}>
              {image?.result && <Image src={image.result} alt="image" />}

              <FormControl>
                <FormLabel cursor="pointer" textAlign={"center"}>
                  <Input
                    type="file"
                    name="file"
                    multiple
                    onChange={uploadPhoto}
                    display="none"
                  />
                  <Box>
                    <FontAwesomeIcon icon={faCloudArrowUp} size="2xl" />
                  </Box>
                  editar imagen
                </FormLabel>
              </FormControl>

              <Textarea
                name="content"
                placeholder="escribe una descripcion..."
              />
              <Button marginLeft={"40%"} marginTop={2} type="submit">
                crear
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
