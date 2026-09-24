import { LogOut } from 'lucide-react'
import Marca from './ui/Marca.jsx'
import Botao from './ui/Botao.jsx'

export default function Header({ usuario, pacienteAtual, onSair }) {
  return (
    <header className="header">
      <Marca compacta />
      <div className="header-meta">
        <p className="header-sessao">
          <strong>{usuario?.nome}</strong>
          <span>@{usuario?.usuario}</span>
        </p>
        <p className="header-paciente">
          {pacienteAtual
            ? `Em análise: ${pacienteAtual.nome}`
            : 'Nenhum paciente selecionado'}
        </p>
      </div>
      <Botao variante="fantasma" icone={LogOut} onClick={onSair}>
        Sair
      </Botao>
    </header>
  )
}