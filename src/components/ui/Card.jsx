export default function Card({ children, className = '', as: Tag = 'section' }) {
  return <Tag className={`card ${className}`.trim()}>{children}</Tag>
}