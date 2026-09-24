import { AlertTriangle } from 'lucide-react'
import Botao from './Botao.jsx'
 
export default function ModalConfirmacao({
  aberto,
  titulo,
  texto,
  rotuloConfirmar = 'Confirmar',
  onConfirmar,
  onCancelar,
}) {
  if (!aberto) return null
 
  return (
    <div className="modal-fundo" role="presentation" onClick={onCancelar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <span className="modal-icone" aria-hidden="true">
          <AlertTriangle size={26} />
        </span>
        <h2 id="modal-titulo">{titulo}</h2>
        <p>{texto}</p>
        <div className="modal-acoes">
          <Botao variante="fantasma" onClick={onCancelar}>
            Cancelar
          </Botao>
          <Botao variante="perigo" onClick={onConfirmar}>
            {rotuloConfirmar}
          </Botao>
        </div>
      </div>
    </div>
  )
}