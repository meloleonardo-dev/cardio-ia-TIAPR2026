import { Link } from 'react-router-dom'
import FormCadastro from '../components/FormCadastro.jsx'
import Marca from '../components/ui/Marca.jsx'

export default function Cadastro({ onCadastrar }) {
  return (
    <section className="auth-card">
      <Marca />
      <h1>Criar acesso</h1>
      <p className="hint">
        Cadastre o profissional que vai usar este aparelho. Depois do
        cadastro, a sessão abre sozinha e os pacientes já gravados
        continuam no mesmo tanque.
      </p>
      <FormCadastro onCadastrar={onCadastrar} />
      <p className="auth-rodape">
        Já tem acesso? <Link to="/login">Entrar</Link>
      </p>
    </section>
  )
}