import { Modal, Card, Typography, Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { fecharModal } from "../../redux/acoes/acoesModal";
import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";
import { dadoExiste } from "../../utils/utils";
import Formulario from "../../components/Formularios/Formulario";
import { useState } from "react";
import { salvarCliente } from "../../database/dbCliente";

const nomeModal = "cliente-modal-form";
const ClienteModalForm = (props = {}) => {
  const { itemDetalhe = {} } = props;

  const open = useSelector((state) => state?.modal?.[nomeModal]) || false;
  const [dados, setDados] = useState(itemDetalhe);

  const editando = dadoExiste(itemDetalhe?._id);

  const campos = [
    {
      tamanhoGrid: { md: 12 },
      label: "Nome",
      name: "nome",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Email",
      name: "email",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Endereço",
      name: "endereco",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "CPF/CNPJ",
      name: "cpfCnpj",
      mask: "cpfCnpj",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Telefone",
      name: "telefone",
      mask: "telefone",
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Observações",
      name: "observacoes",
      rows: 3,
    },
  ];

  const handleClose = () => fecharModal(nomeModal);

  const handleChange = ({ name, value }) =>
    setDados((prev) => ({ ...prev, [name]: value }));

  const handleApply = (event) => {
    event.preventDefault();
    salvarCliente(dados);
  };

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
            id={`${nomeModal}-titulo`}
            variant="h5"
            color={CORES.PRETO}
            fontWeight="bold"
          >
            {editando ? "Editando" : "Criando"} cliente
          </Typography>
        </Box>
        <Box maxHeight={"80vh"} overflow={"auto"} sx={{ p: 2 }}>
          <Formulario
            campos={campos}
            dados={dados}
            onChange={handleChange}
            onSubmit={handleApply}
            sx={{ m: 0, ml: 0, mr: 0, pb: 0 }}
          />
        </Box>
      </Card>
    </Modal>
  );
};

export default ClienteModalForm;
