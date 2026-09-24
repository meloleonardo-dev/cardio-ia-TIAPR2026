import { analisarPerfil } from '../utils/analisarPerfil.js'
import { classificarPressao } from '../utils/classificarPressao.js'
import { formatarData, rotuloContexto } from '../utils/formatar.js'
import Card from './ui/Card.jsx'
import EstadoVazio from './ui/EstadoVazio.jsx'
import Selo from './ui/Selo.jsx'
import { Clock } from 'lucide-react'

export default function PerfilPaciente({ paciente, afericoes }) {
  const perfil = analisarPerfil(afericoes)
  const ordenadas = [...afericoes].sort(
    (a, b) => new Date(a.registradoEm) - new Date(b.registradoEm),
  )

  return (
    <Card className="painel">
      <h2>Perfil de {paciente.nome}</h2>
      <p className="hint">
        {paciente.idade ? `${paciente.idade} anos. ` : ''}
        {afericoes.length} medição(ões) isoladas neste perfil. Análise
        educacional, não substitui avaliação médica.
      </p>

      <div className={`resumo-perfil selo-${perfil.nivel}`}>
        <strong>{perfil.rotulo}</strong>
        <p>{perfil.texto}</p>
      </div>

      <h3>Linha do tempo</h3>
      {ordenadas.length === 0 ? (
        <EstadoVazio
          icone={Clock}
          texto="Sem horários registrados ainda."
        />
      ) : (
        <ol className="linha-tempo">
          {ordenadas.map((item) => {
            const classe = classificarPressao(item.sistolica, item.diastolica)
            return (
              <li key={item.id}>
                <span className="meta">{formatarData(item.registradoEm)}</span>
                <span>
                  {item.sistolica}/{item.diastolica} mmHg
                  {item.contexto && item.contexto !== 'rotina'
                    ? ` · ${rotuloContexto(item.contexto)}`
                    : ''}
                </span>
                <Selo nivel={classe.nivel}>{classe.rotulo}</Selo>
              </li>
            )
          })}
        </ol>
      )}
    </Card>
  )
}