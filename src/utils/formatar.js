export function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}
 
export function rotuloContexto(contexto) {
  if (contexto === 'dor') return 'durante dor'
  if (contexto === 'esforco') return 'após esforço'
  if (contexto === 'outro') return 'outro contexto'
  return 'rotina'
}
