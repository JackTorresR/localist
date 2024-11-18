import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";

const Carregando = (props = {}) => {
  const {
    tema = null,
    mensagem = "Carregando...",
    corMensagem = CORES.PRETO,
  } = props;

  const temaClaro = tema?.toString()?.toUpperCase() === "CLARO";

  return (
    <div
      style={{
        ...Estilos.containerFlexCentralizado,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          border: `8px solid ${
            temaClaro ? CORES.AZUL_ESCURO : CORES.CINZA_PADRAO
          }`,
          borderTop: `8px solid ${
            temaClaro ? CORES.BRANCO : CORES.AZUL_ESCURO
          }`,
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <span
        style={{
          marginTop: 20,
          fontSize: 18,
          color: temaClaro ? CORES.BRANCO : corMensagem,
        }}
      >
        {mensagem}
      </span>
      <style>
        {`
            @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
        `}
      </style>
    </div>
  );
};

export default Carregando;
