import React from "react";
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

const ConfirmarAcaoModal = ({
  modalName,
  executeAction,
  titulo,
  descricao,
}) => {
  const open = useSelector((state) => state?.modal?.[modalName]) || false;

  const handleClose = () => fecharModal(modalName);

  const tituloDefault = "CONFIRMAR";
  const descricaoDefault = "Tem certeza que deseja excluir este item?";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={`${modalName}-titulo`}
      aria-describedby={`${modalName}-descricao`}
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
            id={`${modalName}-titulo`}
            variant="h6"
            color={CORES.BRANCO}
          >
            {titulo?.toUpperCase() || tituloDefault.toUpperCase()}
          </Typography>
        </Box>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 0,
            minHeight: 200,
          }}
        >
          <Typography
            id={`${modalName}-descricao`}
            variant="body1"
            color="textPrimary"
            fontSize={18}
            sx={{ flex: 1, flexGrow: 1 }}
          >
            {descricao || descricaoDefault}
          </Typography>
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
                executeAction();
                handleClose();
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
