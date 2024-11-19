import { Box, Typography } from "@mui/material";
import CORES from "../../styles/Cores";
import { IoFilter } from "react-icons/io5";
import Estilos from "../../styles/Styles";
import { TiPlus } from "react-icons/ti";
import toast from "react-hot-toast";

const CabecalhoTabela = (props = {}) => {
  const {
    titulo = "Tabela",
    quantidade = 0,
    onAdd = null,
    onFilter = null,
    exibirFiltro = false,
    exibirBotaoAdicionar = false,
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        backgroundColor: CORES.CINZA_ESCURO,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Box
        sx={{
          gap: "8px",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ width: 50, height: 50 }}>
          {exibirFiltro && (
            <IoFilter
              style={Estilos.clicavel}
              size={50}
              onClick={() =>
                onFilter ? onFilter() : toast.error("🚧 Em construção!")
              }
            />
          )}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {titulo}
          </Typography>
          <Typography variant="h6">{quantidade} registros</Typography>
        </div>
        <div style={{ width: 50, height: 50 }}>
          {exibirBotaoAdicionar && (
            <TiPlus
              style={Estilos.clicavel}
              size={50}
              onClick={() =>
                onAdd ? onAdd() : toast.error("🚧 Em construção!")
              }
            />
          )}
        </div>
      </Box>
    </Box>
  );
};

export default CabecalhoTabela;
