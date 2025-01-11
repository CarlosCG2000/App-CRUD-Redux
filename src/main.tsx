
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './store'


createRoot(document.getElementById('root')!).render(
  // Nos va a permitir  que desde cualquier parte de la app podamos acceder al store de redux
  // leer y generar nuevos estados
  <Provider store={store}>
    <App />
  </Provider>
)
