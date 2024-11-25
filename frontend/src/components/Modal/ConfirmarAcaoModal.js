import {
  Modal,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { fecharModal } from "../../redux/acoes/acoesModal";
import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";
import { dadoExiste } from "../../utils/utils";

const ConfirmarAcaoModal = (props = {}) => {
  const {
    acao,
    titulo,
    descricao,
    entidade = "",
    itemDetalhe = {},
    nomeAlternativoModal = "",
  } = props;

  const nomeModal = dadoExiste(nomeAlternativoModal)
    ? nomeAlternativoModal
    : `${entidade}-modal-delete`;

  const open = useSelector((state) => state?.modal?.[nomeModal]) || false;

  const handleClose = () => fecharModal(nomeModal);

  const tituloDefault = "CONFIRMAR";
  const descricaoDefault = "Tem certeza que deseja excluir este item?";
  const nomeRegistro =
    itemDetalhe?.nome || itemDetalhe?.observacoes || itemDetalhe?.descricao;

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
          width: "400px",
          margin: "auto",
          marginTop: "10%",
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
            {titulo?.toUpperCase() || tituloDefault.toUpperCase()}
          </Typography>
        </Box>
        <CardContent
          sx={{
            minHeight: 200,
            display: "flex",
            paddingBottom: 0,
            flexDirection: "column",
          }}
        >
          <Typography
            id={`${nomeModal}-descricao`}
            variant="body1"
            color="textPrimary"
            fontSize={18}
            fontWeight="bold"
          >
            {descricao || descricaoDefault}
          </Typography>
          {dadoExiste(nomeRegistro) && (
            <Typography
              id={`${nomeModal}-nome`}
              variant="body1"
              color="textPrimary"
              fontSize={18}
              sx={{ flex: 1, flexGrow: 1 }}
            >
              {nomeRegistro}
            </Typography>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "px",
            }}
          >
            <Button variant="outlined" color="info" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleClose();

                return acao ? acao() : null;
              }}
            >
              Confirmar
            </Button>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ConfirmarAcaoModal;
