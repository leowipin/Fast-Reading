import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './components/Providers/AuthContext'
import Login from './pages/Landing/Login'
import { useEffect } from 'react'
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute'
import SpeedyPage from './pages/Speedy'
import PhotoMemoryPage from './pages/PhotoMemory'
import PermissionBasedRoute from './components/Routes/PermissionBasedRoute'
import RootRoute from './components/Routes/RootRoute'

function App() {

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas publicas */}
          <Route path='/' element={<RootRoute/>}/>
          <Route path='/login' element={<Login/>}/>
          {/* Rutas protegidas */}
          <Route path="/app" element={<AuthenticatedRoute />}>
            
            <Route index element={<Navigate to="speedy" replace />} />
            
            <Route path="speedy">
              <Route index element={<SpeedyPage/>} />
              <Route path='photoMemory' element={<PermissionBasedRoute allowedPermission={'play_photogame'}><PhotoMemoryPage/></PermissionBasedRoute>}  />
            </Route>

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
