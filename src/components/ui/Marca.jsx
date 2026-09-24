import { HeartPulse } from 'lucide-react'

export default function Marca({ compacta = false }) {
  return (
    <div className={compacta ? 'marca marca-compacta' : 'marca'}>
      <span className="marca-icone" aria-hidden="true">
        <HeartPulse size={compacta ? 22 : 28} />
      </span>
      <div>
        <strong>CardioIA</strong>
        {compacta ? null : <span>Acompanhamento educacional de pressão</span>}
      </div>
    </div>
  )
}