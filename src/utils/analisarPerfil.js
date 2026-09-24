import { classificarPressao } from './classificarPressao.js'

const PESO = { normal: 0, atencao: 1, limite: 2, alta: 3, crise: 4 }

export function analisarPerfil(afericoes = []) {
  if (afericoes.length === 0) {
    return {
      nivel: 'vazio',
      rotulo: 'Sem dados',
      texto: 'Registre aferições para ver a análise deste perfil.',
    }
  }

  const soma = afericoes.reduce(
    (acc, item) => ({
      sistolica: acc.sistolica + Number(item.sistolica),
      diastolica: acc.diastolica + Number(item.diastolica),
    }),
    { sistolica: 0, diastolica: 0 },
  )
  const mediaS = Math.round(soma.sistolica / afericoes.length)
  const mediaD = Math.round(soma.diastolica / afericoes.length)
  const media = classificarPressao(mediaS, mediaD)

  const crises = afericoes.filter(
    (item) => classificarPressao(item.sistolica, item.diastolica).nivel === 'crise',
  ).length
  const foraDaRotina = afericoes.filter(
    (item) => item.contexto && item.contexto !== 'rotina',
  ).length

  const nivel = crises > 0 && PESO.crise > PESO[media.nivel] ? 'crise' : media.nivel
  const rotulo = nivel === 'crise' ? 'Crise' : media.rotulo

  let texto = `Média de ${mediaS}/${mediaD} mmHg em ${afericoes.length} medição(ões).`
  if (crises > 0) {
    texto += ` ${crises} medição(ões) em faixa de crise: procure atendimento médico.`
  }
  if (foraDaRotina > 0) {
    texto += ` ${foraDaRotina} medição(ões) fora da rotina (dor, esforço ou outro).`
  }

  return { nivel, rotulo, texto }
}
