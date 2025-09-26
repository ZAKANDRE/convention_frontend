import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Login } from './pages/Login.tsx';
import { CreateAccount } from './pages/CreateAccount';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import { AuthProvider } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <>
          {/* <Route path="/home" id='j' element={<HomePage />} /></Route> */}
      <MantineProvider>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MantineProvider>
    </>
  )
}

export default App;
