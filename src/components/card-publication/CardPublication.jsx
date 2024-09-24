/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Image,
  Text,
  Flex,
  Avatar,
  Box,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { likePublication } from "../../api/likePublication";
import { createComment } from "../../api/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as whiteHeart,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { useCallback } from "react";

export const CardPublication = ({
  publication,
  setPublications,
  publications /* , onOpen, setIdPublication */,
}) => {
  const { user } = useAuth();
  const [buttonsActive, setButtonsActive] = useState({});

  const handlerComment = ({ target }) => {
    if (!buttonsActive[target.id] && target.value.trim().length > 0) {
      setButtonsActive({ ...buttonsActive, [target.id]: target.id });
    } else if (buttonsActive[target.id] && target.value.trim().length < 1) {
      const copy = { ...buttonsActive };
      delete copy[target.id];
      setButtonsActive(copy);
    }
  };

  const sendComment = async (e, id) => {
    e.preventDefault();
    //console.log(id);
    try {
      const comments = await createComment(id, {
        content: e.target.content.value,
      });
      //console.log(comments);
      setButtonsActive({});
      //console.log(publications);
      const updateComment = publications.map((publication) =>
        publication._id === id
          ? {
              ...publication,
              comments: [...publication.comments, comments.data],
            }
          : publication
      );
      setPublications(updateComment);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  // aqui el servidor no va hacer nada hasta que no reciba una solicitud del cliente
  const sendLike = async (id, boolean) => {
    console.log(id, boolean);
    // eliminar like
    if (boolean) {
      const updateLikes = publications.map((p) =>
        p._id === id
          ? {
              ...p,
              likes: p.likes.filter((like) => like != user._id),
            }
          : p
      );
      handlerLike(id, { action: "eliminar" }); // ejecutar timer
      setPublications(updateLikes); // => pero mientras se ejecuta el estado local ya se habra actualizado
    }
    // crear like
    else {
      const updateLikes = publications.map((p) =>
        p._id === id
          ? {
              ...p,
              likes: [...p.likes, user._id],
            }
          : p
      );
      handlerLike(id, { action: "crear" }); // ejecutar timer
      setPublications(updateLikes); // => pero mientras se ejecuta el estado local ya se habra actualizado
    }
  };

  async function petition(id, action) {
    const response = await likePublication(id, action);
    console.log(response);
  }

  const handlerLike = useCallback(debounce(petition, 500), []);

  function debounce(cb, delay) {
    let time;
    return (identificador, action) => {
      clearTimeout(time);
      time = setTimeout(() => {
        cb(identificador, action);
      }, delay);
    };
  }

  const changeState = (id) => {
    console.log(id);
    /* console.log(id); */
    /*  onOpen()
      setIdPublication(id) */
  };
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={`${publication?.ownerPublication?.username}`} />
            <Box>
              <Heading size="sm">
                <Link to={`/profile/${publication.ownerPublication.username}`}>
                  {publication.ownerPublication.username}
                </Link>
              </Heading>
              <Text>Creator, Chakra UI</Text>
            </Box>
          </Flex>

          <IconButton variant="ghost" colorScheme="gray" aria-label="See menu">
            <FontAwesomeIcon icon={faEllipsis} />
          </IconButton>
        </Flex>
      </CardHeader>

      <Image
        objectFit="cover"
        height={"400px"}
        src={publication.file.secure_url}
        alt="image-post"
      />

      <CardBody p={0}>
        <Box>
          <Button
            variant="ghost"
            leftIcon={
              publication.likes.find((like) => like === user._id) ? (
                <FontAwesomeIcon
                  onClick={() => sendLike(publication._id, true)}
                  icon={faHeart}
                  style={{ color: "#ef1f1f" }}
                  size="xl"
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => sendLike(publication._id, false)}
                  icon={whiteHeart}
                  size="xl"
                />
              )
            }
          ></Button>

          <Button variant="ghost">
            <Link to={"/p/" + publication._id}>
              {" "}
              <FontAwesomeIcon icon={faComment} size="xl" />{" "}
            </Link>
          </Button>

          <Button
            variant="ghost"
            leftIcon={
              <FontAwesomeIcon icon={faPaperPlane} rotation={270} size="xl" />
            }
          ></Button>
        </Box>

        <Text ml={"16px"} onClick={() => changeState(publication._id)}>
          {publication.likes.length} Me gusta{" "}
        </Text>
      </CardBody>

      <CardFooter display={"flex"} flexDirection={"column"}>
        <Text>
          <Text as="b">{publication.ownerPublication.username}</Text>{" "}
          {publication.content}
        </Text>
        <Box>
          {publication.comments.length < 1 ? (
            <Text>se el primero en comentar</Text>
          ) : (
            <Link to={"/p/" + publication._id}>
              ver los {publication.comments.length} comentarios
            </Link>
          )}
        </Box>
        <form onSubmit={(e) => sendComment(e, publication._id)}>
          <Box display={"flex"}>
            <Input
              variant="flushed"
              id={publication._id}
              placeholder="agregar un comentario"
              onChange={handlerComment}
              name="content"
            />
            {buttonsActive[publication._id] && (
              <Button type="submit" color={"blue"} bg={"none"}>
                publicar
              </Button>
            )}
          </Box>
        </form>
      </CardFooter>
    </Card>
  );
};
