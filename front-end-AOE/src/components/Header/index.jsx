import { Link } from 'react-router-dom'
import './style.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">AOE</span>
        </Link>

        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/quem-somos" className="nav-link">Quem Somos</Link>
            </li>
            <li className="nav-item">
              <Link to="/hse" className="nav-link">Incidentes</Link>
            </li>
            <li className="nav-item">
              <Link to="/producao" className="nav-link">Produção</Link>
            </li>
            <li className="nav-item">
              <Link to="/contato" className="nav-link">Contato</Link>
            </li>
            <li className="nav-item">
              <Link to="/ManutencaoAtivos" className="nav-link">Manutenção de Ativos</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
