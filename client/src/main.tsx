import './index.css'
import 'react-toastify/dist/ReactToastify.css' // Import Toastify styles
import App from './App.tsx'
import store from './store/store.ts'
import Middleware from './middleware.tsx'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify' // Import ToastContainer

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer />
        <Middleware>
          <App />
        </Middleware>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
