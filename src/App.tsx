import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Login } from './pages/Login';
import { CreateAccount } from './pages/CreateAccount';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <>
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      </MantineProvider>
    </>
  )
}

export default App
