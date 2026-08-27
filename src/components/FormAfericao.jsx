import { useState } from 'react'

const formInicial = {
  sistolica: '',
  diastolica: '',
  pulso: '',
}

export default function FormAfericao({ onSalvar }) {
  const [form, setForm] = useState(formInicial)
  const [erro, setErro] = useState('')

  function atualizarCampo(evento) {
    const { name, value } = evento.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(evento) {
    evento.preventDefault()

    const sistolica = Number(form.sistolica)
    const diastolica = Number(form.diastolica)
    const pulso = form.pulso === '' ? null : Number(form.pulso)

    if (!sistolica || !diastolica) {
      setErro('Informe sistólica e diastólica em mmHg.')
      return
    }

    if (sistolica <= diastolica) {
      setErro('A sistólica precisa ser maior que a diastólica.')
      return
    }

    onSalvar({ sistolica, diastolica, pulso })
    setForm(formInicial)
    setErro('')
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Nova aferição</h2>

      <p className="hint">
        Valores em mmHg, como no medidor. Isto é registro educacional,
        não diagnóstico médico.
      </p>

      <div className="grade-campos">
        <label>
          Sistólica
          <input
            name="sistolica"
            type="number"
            min="70"
            max="250"
            placeholder="120"
            value={form.sistolica}
            onChange={atualizarCampo}
          />
        </label>

        <label>
          Diastólica
          <input
            name="diastolica"
            type="number"
            min="40"
            max="150"
            placeholder="80"
            value={form.diastolica}
            onChange={atualizarCampo}
          />
        </label>

        <label>
          Pulso (opcional)
          <input
            name="pulso"
            type="number"
            min="30"
            max="220"
            placeholder="72"
            value={form.pulso}
            onChange={atualizarCampo}
          />
        </label>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <button type="submit" className="botao-principal">
        Salvar aferição
      </button>
    </form>
  )
}