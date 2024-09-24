/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Sidebar } from "../sidebar/Sidebar";
import { ModalSearch } from "../modal-search/ModalSearch";
import { ModalCreatePublication } from "../modal-create-publication/ModalCreatePublication";
import { Grid, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

export const ProtectedRoutes = () => {
  const { user, loading, isAunthenticated } = useAuth();
  // hook de react router dom que devuelve un objeto con la informacion de la url actual
  const location = useLocation();

  // modal para buscar usuarios
  const { isOpen, onOpen, onClose } = useDisclosure();
  // modal para crear publicaciones
  const {
    isOpen: isPublicationOpen,
    onOpen: onPublicationOpen,
    onClose: onPublicationClose,
  } = useDisclosure();
  // este efecto se ejecutara cuando location(hook con info de la navegacion) cambie
  // este hook detecta los cambio que surgen a nivel de url
  useEffect(() => {
    console.log(isOpen);
    if (isOpen) {
      console.log("ejecutando close modal de buscar usuarios");
      onClose();
    }
  }, [location]);

  if (loading) return <h1>...</h1>;

  if (!user && !isAunthenticated) return <Navigate to="/login" replace />;

  return (
    <Grid
      bg={"#FAFAFA"}
      templateColumns={{ base: "1fr", lg: "350px 1fr" }}
      minHeight={"100vh"}
    >
      <Sidebar onOpen={onOpen} onPublicationOpen={onPublicationOpen} />

      {isOpen && <ModalSearch isOpen={isOpen} onClose={onClose} />}

      {isPublicationOpen && (
        <ModalCreatePublication
          isPublicationOpen={isPublicationOpen}
          onPublicationClose={onPublicationClose}
        />
      )}
      <Outlet />
    </Grid>
  );
};
