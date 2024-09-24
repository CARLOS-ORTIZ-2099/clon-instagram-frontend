/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { usePublication } from "../../context/PublicationProvider";
import { ModalLikes } from "../../components/modal-likes/ModalLikes";
import { CardPublication } from "../../components/card-publication/CardPublication";
import { Box, Spinner, useDisclosure } from "@chakra-ui/react";
import { getPublications } from "../../api/publication";

export const Home = () => {
  // const { hasMore, pending } = usePublication();

  // const refButton = useRef(null);
  //const [idPublication, setIdPublication] = useState("");
  const [publications, setPublications] = useState([]);

  // apenas se renderize el componente Home, debemos consultar al servidor para
  // que me traiga las publicaciones

  /*   useEffect(() => {
    const observer = new IntersectionObserver(observerfunction);
    if (observer && refButton.current) {
      observer.observe(refButton.current);
    }
    //console.log('publications');
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [publications, pending]); */

  /*   async function observerfunction(entries) {
    console.log(entries[0]);
    const firstEntry = entries[0];
    if (!pending) {
      //console.log('falso');
    }
    if (pending) {
      //console.log('verdad');
    }
    if (firstEntry.isIntersecting && hasMore && !pending) {
      await getPublicationsHandler(publications.length);
    }
  } */
  //const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getPublicationsHandler();
  }, []);

  const getPublicationsHandler = async () => {
    try {
      const response = await getPublications();
      console.log(response);

      setPublications(response.data.publications);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"1.5rem"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {publications /* ?.slice(0,0)? */
        .map((publication) => (
          <CardPublication
            key={publication._id}
            publication={publication}
            setPublications={setPublications}
            publications={publications}
            /* onOpen={onOpen}
            setIdPublication={setIdPublication} */
          />
        ))}
      {/*  {hasMore && (
        <Spinner
          ref={refButton}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )} */}
      {/* {isOpen && (
        <ModalLikes
          isOpen={isOpen}
          onClose={onClose}
          idPublication={idPublication}
        />
      )} */}
    </Box>
  );
};

/* la funcion de limpieza de react se ejcuta en 2 situaciones, cuando se
   desmonte el componente y cuando alguno de los elementos de su lista de
   dependecnia cambie, antes de ejecutar el efecto de nuevo
*/
