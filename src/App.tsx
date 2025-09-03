import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Login } from './pages/Login';
import { CreateAccount } from './pages/CreateAccount';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import ProtectedRoutes from './components/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';
import { PublicSocietyForm } from './components/PublicSocietyForm/PublicSocietyForm';
function App() {
  return (
    <>
      <MantineProvider>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route element={<ProtectedRoutes />}>
          <Route path="/home" id='j' element={<HomePage />} /></Route>
          <Route path="/public-access/:token" element={<PublicSocietyForm />} />
      </Routes>
      </AuthProvider>
    </MantineProvider >
    </>
  )
}

export default App
