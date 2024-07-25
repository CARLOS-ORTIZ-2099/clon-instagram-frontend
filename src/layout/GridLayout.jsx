/* eslint-disable react-hooks/exhaustive-deps */
/* import { Box, Grid, GridItem, useBreakpointValue, useMediaQuery } from "@chakra-ui/react" */
import { Sidebar } from "../components/sidebar/Sidebar"
import { ModalForPublication } from "../components/ModalForPublication"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"

import styles from './gridLayout.module.css'
import { useDisclosure } from "@chakra-ui/react"
import { ModalSearch } from "../components/ModalSearch"
console.log(styles);

export const GridLayout = () => {
   // hook que detecta las interacciones que halla con el routing  
   const location = useLocation() 


  useEffect(() => { 
    onClose()
  }, [location])  

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {isOpen : isPublicationOpen, onOpen : onPublicationOpen, onClose : onPublicationClose} = useDisclosure()

  return (
    <div className={styles.containerMain}>
      <Sidebar   /* changeActive = {changeActive} */ onOpen={onOpen}onPublicationOpen={onPublicationOpen} /> 
        {
          isOpen && <ModalSearch isOpen = {isOpen} onClose={onClose}/>
        }

        {
          isPublicationOpen && <ModalForPublication isPublicationOpen = {isPublicationOpen} onPublicationClose={onPublicationClose}/>
        }
          <Outlet/>
    </div>
  )
}
