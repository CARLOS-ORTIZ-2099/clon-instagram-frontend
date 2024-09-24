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
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { deletePublication, editPublication } from "../../api/publication";
import { useNavigate } from "react-router-dom";

export const ModalPublication = ({
  isOpen,
  onClose,
  publication,
  setPublication,
}) => {
  const { user } = useAuth();
  const [isEditPublication, setIsEditPublication] = useState(false);
  const [image, setImage] = useState({ file: "", result: "" });
  const navigate = useNavigate();
  const uploadPhoto = (e) => {
    // creando la instancia del lector
    const reader = new FileReader();
    // capturando el archivo
    const file = e.target.files[0];
    console.log(file);

    // leyendo el archivo
    reader.readAsDataURL(file);
    // evento que se ejecuta cuando se termine de leer dicho archivo
    reader.addEventListener("load", (evt) => {
      //console.log(evt.target.result);
      setImage({ file, result: evt.target.result });
    });
  };

  const setEditPublication = (e) => {
    e.preventDefault();
    const newFormaData = new FormData();
    newFormaData.append("content", e.target.content.value);
    image.file && newFormaData.append("file", image.file);
    console.log(Object.fromEntries(newFormaData));
    editPublicationHandler(publication._id, newFormaData);
  };
  const editPublicationHandler = async (id, fields) => {
    try {
      const {
        data: { body },
      } = await editPublication(id, fields);
      console.log(body);
      // modificar la publicacion que se edito
      setPublication((pr) => ({
        ...pr,
        content: body.content,
        file: body.file,
      }));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePublicationHandler = async (id) => {
    try {
      const data = await deletePublication(id);
      console.log(data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} borderBottom={"solid black 1px"}>
            Publication
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box>
              {!isEditPublication &&
                (user._id == publication.ownerPublication._id ? (
                  <Box display={"flex"} justifyContent={"space-around"}>
                    <Button
                      onClick={() => deletePublicationHandler(publication._id)}
                      colorScheme="red"
                    >
                      eliminar
                    </Button>
                    <Button
                      onClick={() => setIsEditPublication(true)}
                      colorScheme="blue"
                    >
                      editar
                    </Button>
                  </Box>
                ) : (
                  <Button colorScheme="orange">reportar</Button>
                ))}

              {isEditPublication && (
                <Box as="form" onSubmit={setEditPublication}>
                  <Image
                    src={image?.result || publication.file.secure_url}
                    alt="image"
                  />

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
                    defaultValue={publication.content}
                  />
                  <Button marginLeft={"40%"} marginTop={2} type="submit">
                    editar
                  </Button>
                </Box>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
