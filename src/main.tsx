import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssVarsProvider } from '@mui/joy/styles'
import App from './App.tsx'
import theme from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <App />
    </CssVarsProvider>
  </StrictMode>,
)
