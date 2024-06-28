import './App.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { Profile } from './pages/Profile'
import { NotFound } from './pages/NotFound'

function App() {
  

  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>

              {/* esta tiene que ser una ruta protegida */}
              <Route element={<ProtectedRoutes/>}>

                <Route path='/home' element={<Home/>}/>
                <Route path='/profile' element={<Profile/>}/>
                

              </Route>

              <Route path='*' element={<NotFound/>}/>

            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
