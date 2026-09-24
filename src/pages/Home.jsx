import { Link } from 'react-router-dom'
import { Activity, ClipboardPlus, Users } from 'lucide-react'
import Card from '../components/ui/Card.jsx'

export default function Home({
  totalPacientes,
  totalAfericoes,
  pacienteAtual,
  usuario,
}) {
  return (
    <div className="home">
      <Card className="painel">
        <p className="eyebrow">Painel do aparelho</p>
        <h2>Olá, {usuario?.nome?.split(' ')[0] || 'profissional'}</h2>
        <p>
          Escolha um paciente, registre aferições repetidas e acompanhe o
          recorte educacional do perfil. Login, edição e exclusão agora
          existem - API e inteligência artificial continuam fora.
        </p>
      </Card>

      <div className="grade-stats">
        <Card className="stat">
          <Users size={22} />
          <strong>{totalPacientes}</strong>
          <span>paciente(s)</span>
        </Card>
        <Card className="stat">
          <Activity size={22} />
          <strong>{totalAfericoes}</strong>
          <span>aferição(ões)</span>
        </Card>
        <Card className="stat">
          <ClipboardPlus size={22} />
          <strong>{pacienteAtual ? pacienteAtual.nome : '-'}</strong>
          <span>perfil em análise</span>
        </Card>
      </div>

      <div className="acoes-home">
        <Link to="/pacientes" className="botao botao-principal">
          <Users size={18} />
          Cadastrar ou escolher paciente
        </Link>
        <Link to="/afericoes" className="botao botao-secundario">
          Ir para aferições
        </Link>
      </div>
    </div>
  )
}