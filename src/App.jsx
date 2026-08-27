import { useEffect, useState } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Afericoes from './pages/Afericoes.jsx'
import './App.css'

const STORAGE_KEY = 'cardioia-afericoes'

function lerAfericoesSalvas() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY)
    return salvo ? JSON.parse(salvo) : []
  } catch {
    return []
  }
}

export default function App() {
  const [pagina, setPagina] = useState('inicio')
  const [afericoes, setAfericoes] = useState(() => lerAfericoesSalvas())

  useEffect(() => {
    document.title =
      pagina === 'afericoes' ? 'Aferições | CardioIA' : 'CardioIA'
  }, [pagina])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(afericoes))
  }, [afericoes])

  function salvarAfericao(dados) {
    const nova = {
      id: crypto.randomUUID(),
      ...dados,
      registradoEm: new Date().toISOString(),
    }

    setAfericoes((prev) => [nova, ...prev])
  }

  function removerAfericao(id) {
    setAfericoes((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  return (
    <Layout paginaAtual={pagina} onNavegar={setPagina}>
      {pagina === 'inicio' ? (
        <Home
          totalAfericoes={afericoes.length}
          onComecar={() => setPagina('afericoes')}
        />
      ) : (
        <Afericoes
          afericoes={afericoes}
          onSalvar={salvarAfericao}
          onRemover={removerAfericao}
        />
      )}
    </Layout>
  )
}