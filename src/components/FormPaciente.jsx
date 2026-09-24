import { useEffect, useState } from 'react'
import { UserPlus, UserRoundPen } from 'lucide-react'
import Botao from './ui/Botao.jsx'
import Campo from './ui/Campo.jsx'

const formInicial = {
  nome: '',
  idade: '',
}

export default function FormPaciente({ onSalvar, pacienteEdicao, onCancelar }) {
  const [form, setForm] = useState(formInicial)
  const [erro, setErro] = useState('')
  const editando = Boolean(pacienteEdicao)

  useEffect(() => {
    if (pacienteEdicao) {
      setForm({
        nome: pacienteEdicao.nome,
        idade: pacienteEdicao.idade ?? '',
      })
      setErro('')
      return
    }

    setForm(formInicial)
  }, [pacienteEdicao])

  function atualizarCampo(evento) {
    const { name, value } = evento.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(evento) {
    evento.preventDefault()

    const nome = form.nome.trim()
    if (!nome) {
      setErro('Informe o nome do paciente.')
      return
    }

    onSalvar({
      nome,
      idade: form.idade === '' ? null : Number(form.idade),
    })
    setForm(formInicial)
    setErro('')
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>{editando ? 'Editar paciente' : 'Novo paciente'}</h2>
      <p className="hint">
        {editando
          ? 'Altere nome ou idade. O id e as aferições deste perfil permanecem.'
          : 'Cada paciente é um perfil local. As aferições dele ficam isoladas das dos outros.'}
      </p>

      <div className="grade-campos">
        <Campo
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={atualizarCampo}
        />
        <Campo
          label="Idade (opcional)"
          name="idade"
          type="number"
          min="1"
          max="120"
          value={form.idade}
          onChange={atualizarCampo}
        />
      </div>

      {erro ? <p className="erro">{erro}</p> : null}

      <div className="acoes-form">
        {editando ? (
          <Botao variante="fantasma" onClick={onCancelar}>
            Cancelar
          </Botao>
        ) : null}
        <Botao
          type="submit"
          icone={editando ? UserRoundPen : UserPlus}
        >
          {editando ? 'Salvar alterações' : 'Cadastrar paciente'}
        </Botao>
      </div>
    </form>
  )
}