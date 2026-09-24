import { Navigate } from 'react-router-dom'

export default function RotaProtegida({ logado, children }) {
  if (!logado) {
    return <Navigate to="/login" replace />
  }

  return children
}