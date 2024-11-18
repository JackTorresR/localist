import React from "react";
import { Modal, Card, Typography, Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { fecharModal } from "../../redux/acoes/acoesModal";
import CORES from "../../styles/Cores";
import Formulario from "../Formularios/Formulario";
import { atualizarParametrosBusca } from "../../redux/acoes/acoesParametroBusca";

const FiltrarRegistrosModal = ({ modalName, onApplyFilter, searchFields }) => {
  const open = useSelector((state) => state?.modal?.[modalName]) || false;

  const handleClose = () => fecharModal(modalName);

  const [filterData, setFilterData] = React.useState({});

  const handleChange = ({ name, value }) => {
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    atualizarParametrosBusca(modalName, filterData);
    onApplyFilter(filterData);
    handleClose();
  };

  const handleReset = () => {
    setFilterData({});
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={`${modalName}-titulo`}
      aria-describedby={`${modalName}-descricao`}
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
            id={`${modalName}-titulo`}
            variant="h6"
            color={CORES.BRANCO}
          >
            FILTRAR REGISTROS
          </Typography>
        </Box>
        <Box maxHeight={"80vh"} overflow={"auto"} sx={{ p: 2 }}>
          <Formulario
            campos={searchFields}
            dados={filterData}
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
