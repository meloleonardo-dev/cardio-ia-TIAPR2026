import { NavLink } from 'react-router-dom'
import { Activity, ClipboardList, House, Users } from 'lucide-react'

const itens = [
  { to: '/', rotulo: 'Início', icone: House, fim: true },
  { to: '/pacientes', rotulo: 'Pacientes', icone: Users },
  { to: '/afericoes', rotulo: 'Aferições', icone: ClipboardList },
  { to: '/perfil', rotulo: 'Perfil', icone: Activity },
]

export default function Nav() {
  return (
    <nav className="nav" aria-label="Seções do CardioIA">
      {itens.map((item) => {
        const Icone = item.icone
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.fim}
            className={({ isActive }) =>
              isActive ? 'nav-item ativo' : 'nav-item'
            }
          >
            <Icone size={18} strokeWidth={2} />
            {item.rotulo}
          </NavLink>
        )
      })}
    </nav>
  )
}