import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from '@/App'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { theme } from '@/styles/theme'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
