import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import FormAfericao from '../components/FormAfericao.jsx'
import ListaAfericoes from '../components/ListaAfericoes.jsx'
import Card from '../components/ui/Card.jsx'
import EstadoVazio from '../components/ui/EstadoVazio.jsx'

export default function Afericoes({
  paciente,
  afericoes,
  onSalvar,
  onRemover,
}) {
  if (!paciente) {
    return (
      <Card className="painel">
        <EstadoVazio
          icone={Users}
          titulo="Selecione um paciente"
          texto="Cada medição precisa de um perfil. Sem isso, os dados de pessoas diferentes se misturam de novo."
          acao={
            <Link to="/pacientes" className="botao botao-principal">
              Ir para pacientes
            </Link>
          }
        />
      </Card>
    )
  }

  return (
    <Card className="painel">
      <p className="hint">
        Gravando em <strong>{paciente.nome}</strong>. Só as aferições deste
        id aparecem no histórico abaixo.
      </p>
      <FormAfericao onSalvar={onSalvar} />
      <h2>Histórico deste paciente</h2>
      <ListaAfericoes afericoes={afericoes} onRemover={onRemover} />
    </Card>
  )
}