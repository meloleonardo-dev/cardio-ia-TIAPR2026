export default function Campo({
  label,
  name,
  type = 'text',
  value,
  onChange,
  children,
  ...props
}) {
  return (
    <label className="campo">
      {label}
      {children ? (
        children
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
    </label>
  )
}