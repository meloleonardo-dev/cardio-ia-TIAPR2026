import { Pencil, Trash2, UserRound } from 'lucide-react'
import EstadoVazio from './ui/EstadoVazio.jsx'

export default function ListaPacientes({
  pacientes,
  pacienteAtualId,
  afericoes,
  onSelecionar,
  onEditar,
  onPedirExclusao,
}) {
  if (pacientes.length === 0) {
    return (
      <EstadoVazio
        icone={UserRound}
        titulo="Nenhum paciente"
        texto="Use o formulário acima para criar o primeiro perfil deste aparelho."
      />
    )
  }

  return (
    <ul className="lista-pacientes">
      {pacientes.map((paciente) => {
        const total = afericoes.filter((item) => item.pacienteId === paciente.id).length
        const ativo = paciente.id === pacienteAtualId

        return (
          <li key={paciente.id}>
            <article className={ativo ? 'card-paciente ativo' : 'card-paciente'}>
              <button
                type="button"
                className="card-paciente-info"
                onClick={() => onSelecionar(paciente.id)}
              >
                <span className="paciente-avatar" aria-hidden="true">
                  <UserRound size={20} />
                </span>
                <span>
                  <span className="paciente-nome">{paciente.nome}</span>
                  <span className="meta">
                    {paciente.idade ? `${paciente.idade} anos · ` : ''}
                    {total} aferição(ões)
                    {ativo ? ' · selecionado' : ''}
                  </span>
                </span>
              </button>
              <div className="card-paciente-acoes">
                <button
                  type="button"
                  className="icone-botao"
                  aria-label={`Editar ${paciente.nome}`}
                  onClick={() => onEditar(paciente)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  className="icone-botao icone-botao-perigo"
                  aria-label={`Apagar ${paciente.nome}`}
                  onClick={() => onPedirExclusao(paciente)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}