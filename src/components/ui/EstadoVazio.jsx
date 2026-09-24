export default function EstadoVazio({ icone: Icone, titulo, texto, acao }) {
  return (
    <div className="estado-vazio">
      {Icone ? (
        <span className="estado-vazio-icone" aria-hidden="true">
          <Icone size={28} strokeWidth={1.75} />
        </span>
      ) : null}
      {titulo ? <strong>{titulo}</strong> : null}
      <p>{texto}</p>
      {acao}
    </div>
  )
}