export function classificarPressao(sistolica, diastolica) {
  const s = Number(sistolica)
  const d = Number(diastolica)

  if (s >= 180 || d >= 120) {
    return { rotulo: 'Crise', nivel: 'crise' }
  }

  if (s >= 140 || d >= 90) {
    return { rotulo: 'Alta', nivel: 'alta' }
  }

  if (s >= 130 || d >= 85) {
    return { rotulo: 'Limítrofe', nivel: 'limite' }
  }

  if (s >= 120 || d >= 80) {
    return { rotulo: 'Atenção', nivel: 'atencao' }
  }

  return { rotulo: 'Normal', nivel: 'normal' }
}