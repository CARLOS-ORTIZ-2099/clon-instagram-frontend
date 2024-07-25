
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Register } from './pages/register/Register'
import { Login } from './pages/login/Login'
import { Home } from './pages/home/Home'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { Profile } from './pages/Profile'
import { NotFound } from './pages/NotFound'
import { PublicRoutes } from './components/PublicRoutes'
import { AuthProvider } from './context/AuthProvider'
import { PublicationProvider } from './context/PublicationProvider'
import { Publication } from './pages/Publication'
import { CommentProvider } from './context/CommentProvider'
import { ModalFollowers } from './components/ModalFollowers'
import { ModalFolloweds } from './components/ModalFolloweds'
import { Explore } from './pages/explore/Explore'



function App() {
  

  return (
    <>
        <BrowserRouter>
        <AuthProvider>
            <PublicationProvider>
              <CommentProvider>
                <Routes>
                <Route element={<PublicRoutes/>}>
                  <Route path='/' element={<Register/>}/>
                  <Route path='/login' element={<Login/>}/>
                </Route>

                {/* esta tiene que ser una ruta protegida */} 
                <Route element={<ProtectedRoutes/>}>

                  <Route path='/home' element={<Home/>}/>
                  <Route path='/:username' element={<Profile/>}/>
                  <Route path='/:username/:id/followers' element={<ModalFollowers/>}/>
                  <Route path='/:username/:id/following' element={<ModalFolloweds/>}/>
                  <Route path='/p/:idpublication' element={<Publication/>}/>
                  <Route path='/explore' element={<Explore/>}/>

                </Route>

                <Route path='*' element={<NotFound/>}/>

                </Routes>
              </CommentProvider>
            </PublicationProvider>
          </AuthProvider>
        </BrowserRouter>
    </>
  )
}


export default App
