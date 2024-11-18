import BOTOES_ACAO_TELA_INICIAL from "../../data/botoesAcaoTelaInicial";
import AcaoTelaInicialItem from "./AcaoTelaInicialItem";

const AcoesTelaInicial = (props = {}) => {
  return (
    <div
      style={{
        margin: 10,
        paddingTop: 25,
        width: props?.preencherContainer ? "100%" : null,
      }}
    >
      {BOTOES_ACAO_TELA_INICIAL()
        ?.filter((item) => item?.condicao !== false)
        ?.map((item, index) => (
          <AcaoTelaInicialItem
            key={`${index}_botao`}
            item={item}
            index={index}
          />
        ))}
    </div>
  );
};

export default AcoesTelaInicial;
