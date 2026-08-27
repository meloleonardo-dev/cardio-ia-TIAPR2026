import { classificarPressao } from '../utils/classificarPressao.js'

function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export default function ListaAfericoes({ afericoes, onRemover }) {
  if (afericoes.length === 0) {
    return (
      <p className="vazio">
        Nenhuma aferição nesta lista. Preencha o formulário acima.
      </p>
    )
  }

  return (
    <ul className="lista-afericoes">
      {afericoes.map((item) => {
        const classe = classificarPressao(
          item.sistolica,
          item.diastolica
        )

        return (
          <li key={item.id} className="card-afericao">
            <div>
              <p className="medida">
                {item.sistolica}/{item.diastolica}{' '}
                <span>mmHg</span>
              </p>

              <p className="meta">
                {formatarData(item.registradoEm)}
                {item.pulso ? ` · pulso ${item.pulso} bpm` : ''}
              </p>
            </div>

            <div className="acoes-card">
              <span className={`selo selo-${classe.nivel}`}>
                {classe.rotulo}
              </span>

              <button
                type="button"
                onClick={() => onRemover(item.id)}
              >
                Remover
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}