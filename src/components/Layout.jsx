import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Nav from './Nav.jsx'

export default function Layout({ usuario, pacienteAtual, onSair }) {
  return (
    <div className="layout">
      <Header usuario={usuario} pacienteAtual={pacienteAtual} onSair={onSair} />
      <Nav />
      <div className="conteudo">
        <Outlet />
      </div>
    </div>
  )
}