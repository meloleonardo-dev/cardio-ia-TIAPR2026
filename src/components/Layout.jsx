import Header from './Header.jsx'
import Nav from './Nav.jsx'

export default function Layout({ children, paginaAtual, onNavegar }) {
  return (
    <div className="layout">
      <Header
        titulo="CardioIA"
        subtitulo="Registro e acompanhamento das suas aferições de pressão arterial."
      />

      <Nav paginaAtual={paginaAtual} onNavegar={onNavegar} />

      <div className="conteudo">{children}</div>
    </div>
  )
}