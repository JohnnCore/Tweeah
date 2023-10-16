import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.tsx'
import Sidebar from './pages/components/Sidebar.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="container-fluid container-css">
            <div className="row">
              <nav className="col-md-3 col-lg-2 sidebar position-fixed" style={{ marginLeft: "12.5%", marginTop:'1%' }}>
                {/* Defina a largura da Sidebar, remova o padding e a fixe */}
                <Sidebar />
              </nav>
              <main className="col-md-9 col-lg-10 ml-md-3 ml-lg-12 mx-auto">
                {/* Adicione um deslocamento para o conteúdo */}
                <App />
              </main>
            </div>
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode >,
)
