import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import Botao from './ui/Botao.jsx'
import Campo from './ui/Campo.jsx'

const formInicial = {
  nome: '',
  usuario: '',
  senha: '',
  confirmar: '',
}

export default function FormCadastro({ onCadastrar }) {
  const [form, setForm] = useState(formInicial)
  const [erro, setErro] = useState('')

  function atualizarCampo(evento) {
    const { name, value } = evento.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(evento) {
    evento.preventDefault()

    const nome = form.nome.trim()
    const usuario = form.usuario.trim().toLowerCase()

    if (!nome || !usuario || !form.senha) {
      setErro('Preencha nome, usuário e senha.')
      return
    }

    if (usuario.length < 3) {
      setErro('O usuário precisa ter pelo menos 3 caracteres.')
      return
    }

    if (form.senha.length < 4) {
      setErro('A senha precisa ter pelo menos 4 caracteres.')
      return
    }

    if (form.senha !== form.confirmar) {
      setErro('A confirmação de senha não confere.')
      return
    }

    const resultado = onCadastrar({
      nome,
      usuario,
      senha: form.senha,
    })

    if (!resultado.ok) {
      setErro(resultado.erro)
      return
    }

    setErro('')
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <Campo
        label="Nome completo"
        name="nome"
        autoComplete="name"
        value={form.nome}
        onChange={atualizarCampo}
      />
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
        autoComplete="new-password"
        value={form.senha}
        onChange={atualizarCampo}
      />
      <Campo
        label="Confirmar senha"
        name="confirmar"
        type="password"
        autoComplete="new-password"
        value={form.confirmar}
        onChange={atualizarCampo}
      />

      {erro ? <p className="erro">{erro}</p> : null}

      <Botao type="submit" icone={UserPlus}>
        Criar acesso
      </Botao>
    </form>
  )
}