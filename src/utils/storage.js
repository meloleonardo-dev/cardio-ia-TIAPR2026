const STORAGE_KEY = 'cardioia-dados-v2'
const STORAGE_ANTIGO = 'cardioia-afericoes'
 
export function estadoVazio() {
  return {
    usuarios: [],
    sessaoUsuarioId: null,
    pacientes: [],
    pacienteAtualId: null,
    afericoes: [],
  }
}
 
function normalizar(dados) {
  return {
    usuarios: dados.usuarios ?? [],
    sessaoUsuarioId: dados.sessaoUsuarioId ?? null,
    pacientes: dados.pacientes ?? [],
    pacienteAtualId: dados.pacienteAtualId ?? null,
    afericoes: dados.afericoes ?? [],
  }
}
 
export function lerEstado() {
  try {
    const atual = localStorage.getItem(STORAGE_KEY)
    if (atual) {
      return normalizar(JSON.parse(atual))
    }
 
    const antigo = localStorage.getItem(STORAGE_ANTIGO)
    if (antigo) {
      const lista = JSON.parse(antigo)
      if (Array.isArray(lista) && lista.length > 0) {
        const id = crypto.randomUUID()
        return {
          ...estadoVazio(),
          pacientes: [
            {
              id,
              nome: 'Paciente importado',
              idade: '',
              criadoEm: new Date().toISOString(),
            },
          ],
          pacienteAtualId: id,
          afericoes: lista.map((item) => ({
            ...item,
            pacienteId: id,
            contexto: item.contexto || 'rotina',
          })),
        }
      }
    }
  } catch {
    return estadoVazio()
  }
 
  return estadoVazio()
}
 
export function salvarEstado(dados) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizar(dados)))
}