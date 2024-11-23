import { useState, useEffect } from "react";
import { Modal, Card, Typography, Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { fecharModal } from "../../redux/acoes/acoesModal";
import CORES from "../../styles/Cores";
import Formulario from "../../components/Formularios/Formulario";

const FormModal = (props = {}) => {
  const {
    onClose,
    onSubmit,
    campos = [],
    entidade = "",
    tituloCard = "",
    itemDetalhe = {},
  } = props;

  const nomeModal = `${entidade}-modal-form`;
  const open = useSelector((state) => state?.modal?.[nomeModal]) || false;

  const [dados, setDados] = useState(itemDetalhe);
  const editando = Boolean(dados?._id);

  const tituloModal =
    tituloCard || (editando ? "Editar " : "Criar ") + entidade;

  useEffect(() => setDados(itemDetalhe), [itemDetalhe]);

  const handleClose = () => {
    fecharModal(nomeModal);
    onClose && onClose();
  };

  const handleChange = ({ name, value }) =>
    setDados((prev) => ({ ...prev, [name]: value }));

  const handleApply = (event) => {
    event.preventDefault();
    onSubmit && onSubmit(dados);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={`${nomeModal}-titulo`}
      aria-describedby={`${nomeModal}-descricao`}
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
            id={`${nomeModal}-titulo`}
          >
            {tituloModal}
          </Typography>
        </Box>
        <Box maxHeight={"80vh"} overflow={"auto"} sx={{ p: 2 }}>
          <Formulario
            campos={campos?.filter((item) => item?.mostrarFormulario !== false)}
            dados={dados}
            onChange={handleChange}
            onSubmit={handleApply}
            sx={{ m: 0, ml: 0, mr: 0, pb: 0 }}
            buttonTitleSubmit="Salvar"
          />
        </Box>
      </Card>
    </Modal>
  );
};

export default FormModal;
