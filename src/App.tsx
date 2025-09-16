import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Login } from './pages/Login.tsx';
import { CreateAccount } from './pages/CreateAccount';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import { AuthProvider } from './context/AuthContext';
import { PublicSocietyForm } from './components/PublicSocietyForm/PublicSocietyForm';
import React, { Suspense, lazy } from 'react';
import { Spinner } from './components/Spinner/Spinner.tsx'


function App() {
  return (
    <>
          {/* <Route path="/home" id='j' element={<HomePage />} /></Route> */}
      <MantineProvider>
        <AuthProvider>
          <Routes>
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
            <Route path="/public-access/:token" element={<PublicSocietyForm />} />
          </Routes>
        </AuthProvider>
      </MantineProvider>
    </>
  )
}

export default App;
