import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import PerfilPaciente from '../components/PerfilPaciente.jsx'
import Card from '../components/ui/Card.jsx'
import EstadoVazio from '../components/ui/EstadoVazio.jsx'

export default function Perfil({ paciente, afericoes }) {
  if (!paciente) {
    return (
      <Card className="painel">
        <EstadoVazio
          icone={Users}
          titulo="Nenhum paciente selecionado"
          texto="O perfil reúne as medições repetidas de uma pessoa: horários, tendência e o recorte educacional."
          acao={
            <Link to="/pacientes" className="botao botao-principal">
              Escolher paciente
            </Link>
          }
        />
      </Card>
    )
  }

  return <PerfilPaciente paciente={paciente} afericoes={afericoes} />
}