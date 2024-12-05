import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './components/Providers/AuthContext'
import Landing from './pages/Landing'
import ProtectedRoute from './components/Routes/ProtectedRoute'
import Home from './pages/Home/Home'
import { useEffect } from 'react'

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
          <Route path='/' element={<Landing/>}></Route>
          {/* Rutas protegidas */}
          <Route path='/' element={<ProtectedRoute allowedRoles={['normal_user','premium_user']}></ProtectedRoute>}>
            <Route index path='/home' element={<Home/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
