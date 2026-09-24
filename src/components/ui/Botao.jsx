export default function Botao({
  children,
  variante = 'principal',
  type = 'button',
  icone: Icone,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`botao botao-${variante} ${className}`.trim()}
      {...props}
    >
      {Icone ? <Icone size={18} strokeWidth={2} /> : null}
      {children}
    </button>
  )
}