import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './context/AppContext.tsx';

export const authService = "http://localhost:5000" ;




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1034108021982-h7jtu4vdntm27kc13dumf9gn4p3smbp5.apps.googleusercontent.com">
      <AppProvider>

        <App />
      </AppProvider>
      
    </GoogleOAuthProvider>
    
  </StrictMode>,
)
