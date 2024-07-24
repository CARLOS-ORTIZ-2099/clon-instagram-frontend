/* import { Box, Grid, GridItem, useBreakpointValue, useMediaQuery } from "@chakra-ui/react" */
import { Sidebar } from "../components/sidebar/Sidebar"
import { ModalForPublication } from "../components/ModalForPublication"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import styles from './gridLayout.module.css'
console.log(styles);

export const GridLayout = () => {
  // estado para interactuar con el buscador
  const [activateSearch, setActivateSearch] = useState(false) 
  // modal  para crear una nueva publicacion  
  const [activateModal, setActivateModal] = useState(false)
  // funcion para activar el modal de la publicacion 
  const changeActive = () => setActivateModal(!activateModal)
  // hook que detecta las interacciones que halla con el routing  
  const location = useLocation() 


  useEffect(() => {
     setActivateSearch(false)
  }, [location.key])  



  return (
    <div className={styles.containerMain}>
          <Sidebar   changeActive = {changeActive} setActivateSearch = {setActivateSearch} activateSearch = {activateSearch}/> 
      
          {
            activateModal && <ModalForPublication changeActive = {changeActive}/>
          }
          <Outlet/>
    </div>
  )
}
