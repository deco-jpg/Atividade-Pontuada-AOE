import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contato from './pages/Contato'
import QuemSomos from './pages/QuemSomos'
import incidentes from './pages/Incidentes'
import Producao from './pages/Producao'
import ManutencaoAtivos from './pages/ManutencaoAtivos'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/incidentes" element={<incidentes />} />
        <Route path="/producao" element={<Producao />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/ManutencaoAtivos" element={<ManutencaoAtivos />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

