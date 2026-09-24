import { Link } from 'react-router-dom'
import FormLogin from '../components/FormLogin.jsx'
import Marca from '../components/ui/Marca.jsx'

export default function Login({ onEntrar }) {
  return (
    <section className="auth-card">
      <Marca />
      <h1>Entrar no aparelho</h1>
      <p className="hint">
        Acesso local do profissional. Usuário e senha ficam só neste
        navegador - material educacional, sem servidor.
      </p>
      <FormLogin onEntrar={onEntrar} />
      <p className="auth-rodape">
        Primeiro acesso? <Link to="/cadastro">Criar usuário e senha</Link>
      </p>
    </section>
  )
}