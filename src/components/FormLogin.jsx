import { useState } from 'react'
import { LogIn } from 'lucide-react'
import Botao from './ui/Botao.jsx'
import Campo from './ui/Campo.jsx'

const formInicial = {
  usuario: '',
  senha: '',
}

export default function FormLogin({ onEntrar }) {
  const [form, setForm] = useState(formInicial)
  const [erro, setErro] = useState('')

  function atualizarCampo(evento) {
    const { name, value } = evento.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(evento) {
    evento.preventDefault()

    const usuario = form.usuario.trim()
    if (!usuario || !form.senha) {
      setErro('Informe usuário e senha.')
      return
    }

    const resultado = onEntrar({ usuario, senha: form.senha })
    if (!resultado.ok) {
      setErro(resultado.erro)
      return
    }

    setErro('')
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <Campo
        label="Usuário"
        name="usuario"
        autoComplete="username"
        value={form.usuario}
        onChange={atualizarCampo}
      />
      <Campo
        label="Senha"
        name="senha"
        type="password"
        autoComplete="current-password"
        value={form.senha}
        onChange={atualizarCampo}
      />

      {erro ? <p className="erro">{erro}</p> : null}

      <Botao type="submit" icone={LogIn}>
        Entrar
      </Botao>
    </form>
  )
}