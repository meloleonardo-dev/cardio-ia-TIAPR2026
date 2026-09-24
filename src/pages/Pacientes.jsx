import { useState } from 'react'
import { Users } from 'lucide-react'
import FormPaciente from '../components/FormPaciente.jsx'
import ListaPacientes from '../components/ListaPacientes.jsx'
import Card from '../components/ui/Card.jsx'
import ModalConfirmacao from '../components/ui/ModalConfirmacao.jsx'

export default function Pacientes({
  pacientes,
  pacienteAtualId,
  afericoes,
  onSalvar,
  onEditar,
  onRemover,
  onSelecionar,
}) {
  const [edicao, setEdicao] = useState(null)
  const [excluir, setExcluir] = useState(null)

  function handleSalvar(dados) {
    if (edicao) {
      onEditar(edicao.id, dados)
      setEdicao(null)
      return
    }

    onSalvar(dados)
  }

  return (
    <Card className="painel">
      <FormPaciente
        pacienteEdicao={edicao}
        onSalvar={handleSalvar}
        onCancelar={() => setEdicao(null)}
      />
      <h2>
        <Users size={20} /> Pacientes deste aparelho
      </h2>
      <p className="hint">
        Clique no nome para selecionar. Lápis edita o cadastro. Lixeira apaga
        o perfil e todas as aferições daquele id.
      </p>
      <ListaPacientes
        pacientes={pacientes}
        pacienteAtualId={pacienteAtualId}
        afericoes={afericoes}
        onSelecionar={onSelecionar}
        onEditar={setEdicao}
        onPedirExclusao={setExcluir}
      />
      <ModalConfirmacao
        aberto={Boolean(excluir)}
        titulo="Apagar este perfil?"
        texto={
          excluir
            ? `${excluir.nome} e todas as aferições ligadas a este id saem do aparelho. Esta ação não volta atrás.`
            : ''
        }
        rotuloConfirmar="Apagar perfil"
        onCancelar={() => setExcluir(null)}
        onConfirmar={() => {
          onRemover(excluir.id)
          setExcluir(null)
        }}
      />
    </Card>
  )
}