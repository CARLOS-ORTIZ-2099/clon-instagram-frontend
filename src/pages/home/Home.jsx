/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"
import { usePublication } from "../../context/PublicationProvider"
import { ModalLikes } from "../../components/modal-likes/ModalLikes"
import { CardPublication } from "../../components/card-publication/CardPublication"
import { Box, useDisclosure } from "@chakra-ui/react"


export const Home = () => {  

  const {getPublicationsHandler, publications, hasMore, pending} = usePublication() 
  const refButton = useRef(null)
  const [idPublication, setIdPublication] = useState('')

  useEffect(() => { 
      const observer = new IntersectionObserver(observerfunction)
      if(observer && refButton.current){
        observer.observe(refButton.current)
      }
      //console.log('publications');
      return () => {    
        if(observer) {
          observer.disconnect()  
        }
      }
     
  }, [publications, pending])   

  async function observerfunction(entries) {
      console.log(entries[0]);
      const firstEntry = entries[0]
      if(!pending) {
        //console.log('falso');
      }
      if(pending){
        //console.log('verdad');
      } 
      if((firstEntry.isIntersecting && hasMore && !pending) ) {
       await getPublicationsHandler(publications.length)
       
      }
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
 

  return ( 
    <Box border={'solid green 3px'} display={'flex'} flexDirection={'column'} 
         gap={'1.5rem'} justifyContent={'center'} alignItems={'center'} bg={'#5da8db'}>
      {
        publications/* ?.slice(0,0)? */.map((publication) => (
            <CardPublication key={publication._id}
              publication = {publication}
              onOpen = {onOpen}
              setIdPublication={setIdPublication}
            />
        ))
      }
      { 
        hasMore && <button ref={refButton}>cargando...</button> 
      } 
      {
        isOpen && <ModalLikes isOpen = {isOpen} onClose={onClose} idPublication={idPublication} />
      }
    </Box>
  )
}

/* la funcion de limpieza de react se ejcuta en 2 situaciones, cuando se
   desmonte el componente y cuando alguno de los elementos de su lista de
   dependecnia cambie, si pasa eso el efecto se ejecutara nuevamente pero la
   funcion de limpieza limpiara el efecto anterior, antes de ejecutar la
   logica nueva
*/
