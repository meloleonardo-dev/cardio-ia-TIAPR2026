import { ClipboardList, Trash2 } from 'lucide-react'
import { classificarPressao } from '../utils/classificarPressao.js'
import { formatarData, rotuloContexto } from '../utils/formatar.js'
import EstadoVazio from './ui/EstadoVazio.jsx'
import Selo from './ui/Selo.jsx'

export default function ListaAfericoes({ afericoes, onRemover }) {
  if (afericoes.length === 0) {
    return (
      <EstadoVazio
        icone={ClipboardList}
        titulo="Sem medições neste perfil"
        texto="Preencha o formulário acima. Medições de outros pacientes não aparecem aqui."
      />
    )
  }

  return (
    <ul className="lista-afericoes">
      {afericoes.map((item) => {
        const classe = classificarPressao(item.sistolica, item.diastolica)

        return (
          <li key={item.id} className="card-afericao">
            <div>
              <p className="medida">
                {item.sistolica}/{item.diastolica} <span>mmHg</span>
              </p>
              <p className="meta">
                {formatarData(item.registradoEm)}
                {item.pulso ? ` · pulso ${item.pulso} bpm` : ''}
                {` · ${rotuloContexto(item.contexto)}`}
              </p>
            </div>
            <div className="acoes-card">
              <Selo nivel={classe.nivel}>{classe.rotulo}</Selo>
              <button
                type="button"
                className="icone-botao icone-botao-perigo"
                aria-label="Remover aferição"
                onClick={() => onRemover(item.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}