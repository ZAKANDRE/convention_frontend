import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Authentication } from './pages/Authentication';
function App() {
  return (
    <>
    <MantineProvider>
      <Authentication/>
      </MantineProvider>
    </>
  )
}

export default App
