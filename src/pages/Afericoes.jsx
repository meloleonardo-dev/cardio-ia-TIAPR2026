import FormAfericao from '../components/FormAfericao.jsx'
import ListaAfericoes from '../components/ListaAfericoes.jsx'

export default function Afericoes({ afericoes, onSalvar, onRemover }) {
  return (
    <section className="painel">
      <FormAfericao onSalvar={onSalvar} />

      <h2>Histórico</h2>

      <ListaAfericoes
        afericoes={afericoes}
        onRemover={onRemover}
      />
    </section>
  )
}