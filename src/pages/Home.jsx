export default function Home({ totalAfericoes, onComecar }) {
  return (
    <section className="painel">
      <h2>Olá. Vamos acompanhar a sua pressão.</h2>

      <p>
        Nesta etapa o CardioIA registra as aferições que você mesmo mede.
        Ainda não há inteligência artificial: o foco é organizar os dados
        com componentes, props e estado.
      </p>

      <p className="hint">
        {totalAfericoes === 0
          ? 'Nenhuma aferição salva ainda. Comece pelo formulário.'
          : `Você já registrou ${totalAfericoes} aferição(ões).`}
      </p>

      <button
        type="button"
        className="botao-principal"
        onClick={onComecar}
      >
        Registrar aferição
      </button>
    </section>
  )
}