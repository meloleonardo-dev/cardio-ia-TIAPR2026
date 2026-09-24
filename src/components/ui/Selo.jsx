export default function Selo({ nivel, children }) {
  return <span className={`selo selo-${nivel}`}>{children}</span>
}