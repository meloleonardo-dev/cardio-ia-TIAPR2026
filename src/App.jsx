import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import RotaProtegida from './components/RotaProtegida.jsx'
import Home from './pages/Home.jsx'
import Pacientes from './pages/Pacientes.jsx'
import Afericoes from './pages/Afericoes.jsx'
import Perfil from './pages/Perfil.jsx'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import { lerEstado, salvarEstado } from './utils/storage.js'
import { codificarSenha, senhaConfere } from './utils/senha.js'
import './App.css'

export default function App() {
  const [inicial] = useState(lerEstado)
  const [usuarios, setUsuarios] = useState(inicial.usuarios)
  const [sessaoUsuarioId, setSessaoUsuarioId] = useState(inicial.sessaoUsuarioId)
  const [pacientes, setPacientes] = useState(inicial.pacientes)
  const [pacienteAtualId, setPacienteAtualId] = useState(inicial.pacienteAtualId)
  const [afericoes, setAfericoes] = useState(inicial.afericoes)

  const navigate = useNavigate()
  const local = useLocation()

  const usuarioAtual = usuarios.find((item) => item.id === sessaoUsuarioId) ?? null
  const logado = Boolean(usuarioAtual)
  const pacienteAtual = pacientes.find((item) => item.id === pacienteAtualId) ?? null
  const afericoesDoPaciente = afericoes.filter(
    (item) => item.pacienteId === pacienteAtualId,
  )

  useEffect(() => {
    const titulos = {
      '/': 'CardioIA',
      '/pacientes': 'Pacientes | CardioIA',
      '/afericoes': 'Aferições | CardioIA',
      '/perfil': 'Perfil | CardioIA',
      '/login': 'Entrar | CardioIA',
      '/cadastro': 'Criar acesso | CardioIA',
    }
    document.title = titulos[local.pathname] ?? 'CardioIA'
  }, [local.pathname])

  useEffect(() => {
    salvarEstado({
      usuarios,
      sessaoUsuarioId,
      pacientes,
      pacienteAtualId,
      afericoes,
    })
  }, [usuarios, sessaoUsuarioId, pacientes, pacienteAtualId, afericoes])

  function cadastrarUsuario(dados) {
    const usuario = dados.usuario.trim().toLowerCase()
    const existe = usuarios.some((item) => item.usuario === usuario)

    if (existe) {
      return { ok: false, erro: 'Este usuário já está cadastrado neste navegador.' }
    }

    const novo = {
      id: crypto.randomUUID(),
      nome: dados.nome,
      usuario,
      senha: codificarSenha(dados.senha),
      criadoEm: new Date().toISOString(),
    }

    setUsuarios((prev) => [novo, ...prev])
    setSessaoUsuarioId(novo.id)
    navigate('/')
    return { ok: true }
  }

  function entrar(dados) {
    const usuario = dados.usuario.trim().toLowerCase()
    const encontrado = usuarios.find((item) => item.usuario === usuario)

    if (!encontrado || !senhaConfere(dados.senha, encontrado.senha)) {
      return { ok: false, erro: 'Usuário ou senha inválidos.' }
    }

    setSessaoUsuarioId(encontrado.id)
    navigate('/')
    return { ok: true }
  }

  function sair() {
    setSessaoUsuarioId(null)
    navigate('/login')
  }

  function salvarPaciente(dados) {
    const novo = {
      id: crypto.randomUUID(),
      ...dados,
      criadoEm: new Date().toISOString(),
    }

    setPacientes((prev) => [novo, ...prev])
    setPacienteAtualId(novo.id)
  }

  function editarPaciente(id, dados) {
    setPacientes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...dados } : item)),
    )
  }

  function removerPaciente(id) {
    setPacientes((prev) => prev.filter((item) => item.id !== id))
    setAfericoes((prev) => prev.filter((item) => item.pacienteId !== id))
    setPacienteAtualId((atual) => (atual === id ? null : atual))
  }

  function salvarAfericao(dados) {
    if (!pacienteAtualId) return

    const nova = {
      id: crypto.randomUUID(),
      pacienteId: pacienteAtualId,
      ...dados,
      registradoEm: new Date().toISOString(),
    }

    setAfericoes((prev) => [nova, ...prev])
  }

  function removerAfericao(id) {
    setAfericoes((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={logado ? <Navigate to="/" replace /> : <Login onEntrar={entrar} />}
      />
      <Route
        path="/cadastro"
        element={
          logado ? <Navigate to="/" replace /> : <Cadastro onCadastrar={cadastrarUsuario} />
        }
      />
      <Route
        element={
          <RotaProtegida logado={logado}>
            <Layout
              usuario={usuarioAtual}
              pacienteAtual={pacienteAtual}
              onSair={sair}
            />
          </RotaProtegida>
        }
      >
        <Route
          path="/"
          element={
            <Home
              usuario={usuarioAtual}
              totalPacientes={pacientes.length}
              totalAfericoes={afericoes.length}
              pacienteAtual={pacienteAtual}
            />
          }
        />
        <Route
          path="/pacientes"
          element={
            <Pacientes
              pacientes={pacientes}
              pacienteAtualId={pacienteAtualId}
              afericoes={afericoes}
              onSalvar={salvarPaciente}
              onEditar={editarPaciente}
              onRemover={removerPaciente}
              onSelecionar={setPacienteAtualId}
            />
          }
        />
        <Route
          path="/afericoes"
          element={
            <Afericoes
              paciente={pacienteAtual}
              afericoes={afericoesDoPaciente}
              onSalvar={salvarAfericao}
              onRemover={removerAfericao}
            />
          }
        />
        <Route
          path="/perfil"
          element={
            <Perfil paciente={pacienteAtual} afericoes={afericoesDoPaciente} />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={logado ? '/' : '/login'} replace />} />
    </Routes>
  )
}