import { Modal, Card, Typography, Box, Paper, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { fecharModal } from "../../redux/acoes/acoesModal";
import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";

const InfoModal = (props = {}) => {
  const { entidade = "", titulo, campos, itemDetalhe } = props;

  const nomeModal = `${entidade}-modal-info`;
  const open = useSelector((state) => state?.modal?.[nomeModal]) || false;

  const handleClose = () => fecharModal(nomeModal);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={`${nomeModal}-titulo`}
      aria-describedby={`${nomeModal}-descricao`}
      sx={Estilos.containerFlexCentralizado}
    >
      <Card
        style={{
          width: "80vh",
          padding: "20px",
          position: "relative",
          overflow: "unset",
        }}
      >
        <Box
          component={Paper}
          sx={{
            background: CORES.BACKGROUND_GRADIENT,
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
            id={`${nomeModal}-titulo`}
          >
            {titulo || "Detalhes"}
          </Typography>
        </Box>
        <Box maxHeight={"80vh"} overflow={"auto"} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {campos
              ?.filter((item) => item?.tipo !== "password")
              ?.map((campo, index) => (
                <Grid
                  key={index}
                  item
                  xs={campo?.tamanhoGrid?.xs || 12}
                  md={campo?.tamanhoGrid?.md || 6}
                  sm={campo?.tamanhoGrid?.sm || 6}
                >
                  <Typography variant="subtitle2" color={CORES.PRETO}>
                    {campo?.label}:
                  </Typography>
                  <Typography variant="body1" color={CORES.CINZA}>
                    {campo?.formatar
                      ? campo?.formatar(itemDetalhe?.[campo?.name])
                      : itemDetalhe?.[campo.name] || "---"}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Card>
    </Modal>
  );
};

export default InfoModal;
