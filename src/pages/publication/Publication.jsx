/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModalPublication } from "../../components/modal-publication/ModalPublication";
import { useAuth } from "../../context/AuthProvider";
import { likePublication } from "../../api/likePublication";
import { ModalLikes } from "../../components/modal-likes/ModalLikes";
import { useDisclosure } from "@chakra-ui/react";
import { ModalComment } from "../../components/modal-comment/ModalComment";
import { PublicationMain } from "../../components/Publication-main/PublicationMain";
import { getPublication } from "../../api/publication";
import { createComment, deletecomment, editComment } from "../../api/comment";
import { useCallback } from "react";

export const Publication = () => {
  const { idpublication } = useParams();
  const { user } = useAuth();
  // estado que captura el comentario de la publicacion que se este intentando edita/eliminar o reportar
  const [publication, setPublication] = useState({});

  useEffect(() => {
    getPublicationHandler(idpublication);
    //console.log(publication);
  }, []);
  // funcion para obtener la informacion de una publicacion en especifico
  const getPublicationHandler = async (id) => {
    try {
      const response = await getPublication(id);
      console.log(response);
      setPublication(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };
  // funcion para crear comentario
  const createCommentHandler = async (e, comment) => {
    e.preventDefault();
    if (comment.trim().length < 1) {
      alert("inserta un comentario");
      return;
    }
    try {
      const response = await createComment(idpublication, {
        content: comment,
        username: user.username,
      });
      console.log(response);
      console.log(publication);
      setPublication((previous) => ({
        ...previous,
        comments: [...previous.comments, response.data],
      }));
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };
  // funcion para dar like o deslike
  const sendLike = async (id, boolean) => {
    console.log(id, boolean);
    // eliminar like
    if (boolean) {
      const updateLikes = publication.likes.filter(
        (like) => like._id !== user._id
      );
      handlerLike(id, { action: "eliminar" });
      setPublication({ ...publication, likes: updateLikes });
    }
    // crear like
    else {
      const updateLikes = [...publication.likes, { ...user }];
      handlerLike(id, { action: "crear" });
      setPublication({ ...publication, likes: updateLikes });
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

  // hook para controlar el estado del modal de los likes
  const {
    isOpen: isOpenModalLike,
    onOpen: onOpenModalLike,
    onClose: onCloseModalLike,
  } = useDisclosure();

  const showModalLikes = () => onOpenModalLike();

  // hook para controlar los estados del modal de editar/eliminar publicacion
  const {
    isOpen: isOpenModalOptions,
    onOpen: onOpenModalOptions,
    onClose: onCloseModalOptions,
  } = useDisclosure();
  // esta funcion abrira el modal para las opciones de editar y/o eliminar publicacion
  const showModalOptionsPublication = () => onOpenModalOptions();

  // hooks para controlar los estados del modal de editar/eliminar comentario
  const [commentSelect, setCommentSelect] = useState();
  const {
    isOpen: isOpenModalComment,
    onOpen: onOpenModalComment,
    onClose: onCloseModalComment,
  } = useDisclosure();
  // esta funcion abrira el modal para las opciones de editar y/o eliminar comentario
  const showModalComment = (comment) => {
    console.log(comment);
    onOpenModalComment();
    console.log(comment.ownerComment._id);
    setCommentSelect(comment);
  };
  // funcion para eliminar comentario
  const deleteCommentHandler = async (idComment) => {
    console.log(idComment, publication._id);
    try {
      const response = await deletecomment(publication._id, idComment);
      console.log(response);

      const updateComments = publication.comments.filter(
        (comment) => comment._id != response.data
      );
      setPublication({ ...publication, comments: updateComments });

      onCloseModalComment();
    } catch (error) {
      console.log(error);
    }
  };

  const editCommentHandler = async (e, idComment, data) => {
    e.preventDefault();
    //console.log(e, idComment, data);
    try {
      // recibe el id de la publicacion el id del comentario a editar y el valor a editar
      const response = await editComment(publication._id, idComment, {
        content: data,
      });
      console.log(response);
      console.log(publication);
      const editComments = publication.comments.map((comment) =>
        comment._id === idComment
          ? { ...comment, content: response.data.comment.content }
          : comment
      );
      setPublication({ ...publication, comments: editComments });
      onCloseModalComment();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PublicationMain
        publication={publication}
        createComment={createCommentHandler}
        sendLike={sendLike}
        showModalOptionsPublication={showModalOptionsPublication}
        showModalComment={showModalComment}
        showModalLikes={showModalLikes}
      />
      {isOpenModalOptions && (
        <ModalPublication
          isOpen={isOpenModalOptions}
          onClose={onCloseModalOptions}
          publication={publication}
          setPublication={setPublication}
        />
      )}

      {isOpenModalComment && (
        <ModalComment
          isOpenModalComment={isOpenModalComment}
          onCloseModalComment={onCloseModalComment}
          commentSelect={commentSelect}
          deleteComent={deleteCommentHandler}
          editComment={editCommentHandler}
        />
      )}
      {isOpenModalLike && (
        <ModalLikes
          isOpen={isOpenModalLike}
          onClose={onCloseModalLike}
          idPublication={idpublication}
        />
      )}
    </>
  );
};
