import { useState } from "react";
import { Modal, Card, Typography, Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { fecharModal } from "../../redux/acoes/acoesModal";
import CORES from "../../styles/Cores";
import Formulario from "../Formularios/Formulario";
import { atualizarParametrosBusca } from "../../redux/acoes/acoesParametroBusca";
import toast from "react-hot-toast";

const FiltrarRegistrosModal = (props = {}) => {
  const { acao = null, camposFiltro = [], entidade = "filtro" } = props;

  const nomeModalFiltro = `${entidade}-modal-filter`;

  const parametrosBusca = useSelector(
    (state) => state?.parametroBusca?.[nomeModalFiltro] || {}
  );
  const open = useSelector((state) => state?.modal?.[nomeModalFiltro]) || false;

  const handleClose = () => fecharModal(nomeModalFiltro);

  const [dadosFiltrados, setDadosFiltrados] = useState(parametrosBusca);

  const handleChange = ({ name, value }) =>
    setDadosFiltrados((prev) => ({ ...prev, [name]: value }));

  const handleApply = () => {
    atualizarParametrosBusca(nomeModalFiltro, dadosFiltrados);
    acao ? acao(dadosFiltrados) : toast.error("🚧 Em construção!");
    handleClose();
  };

  const handleReset = () => setDadosFiltrados({});

  const camposFiltraveis = camposFiltro
    ?.filter((item) => item?.filtravel !== false)
    ?.map((item) => ({ ...item, obrigatorio: false }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={`${nomeModalFiltro}-titulo`}
      aria-describedby={`${nomeModalFiltro}-descricao`}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: { xs: "95%", sm: "70%", md: "50%" },
          padding: "20px",
          paddingBottom: 0,
          position: "relative",
          overflow: "unset",
        }}
      >
        <Box
          component={Paper}
          sx={{
            background: CORES.BACKGROUND_GRADIENT,
            boxShadow: 5,
            padding: "10px",
            borderRadius: "8px",
            marginTop: "-40px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color={CORES.PRETO}
            id={`${nomeModalFiltro}-titulo`}
          >
            Filtrar registros
          </Typography>
        </Box>
        <Box maxHeight={"80vh"} overflow={"auto"} sx={{ p: 2 }}>
          <Formulario
            campos={camposFiltraveis}
            dados={dadosFiltrados}
            onChange={handleChange}
            onSubmit={handleApply}
            onReset={handleReset}
            sx={{ m: 0, ml: 0, mr: 0, pb: 0 }}
            buttonTitleSubmit="Localizar"
          />
        </Box>
      </Card>
    </Modal>
  );
};

export default FiltrarRegistrosModal;
