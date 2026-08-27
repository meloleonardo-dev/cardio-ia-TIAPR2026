export default function Header({ titulo, subtitulo }) {
  return (
    <header className="header">
      <p className="eyebrow">FIAP · 2TIAPR · 2026</p>
      <h1>{titulo}</h1>
      <p className="lead">{subtitulo}</p>
    </header>
  )
}