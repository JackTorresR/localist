import { Modal, Card, Typography, Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { fecharModal } from "../../redux/acoes/acoesModal";
import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";
import { dadoExiste } from "../../utils/utils";
import Formulario from "../../components/Formularios/Formulario";
import { useState } from "react";
import { salvarAreaDepartamento } from "../../database/dbAreaDepartamento";

const nomeModal = "areaDepartamento-modal-form";
const AreaDepartamentoModalForm = (props = {}) => {
  const { itemDetalhe = {} } = props;

  const open = useSelector((state) => state?.modal?.[nomeModal]) || false;
  const [dados, setDados] = useState(itemDetalhe);

  const editando = dadoExiste(itemDetalhe?._id);

  const campos = [
    {
      tamanhoGrid: { md: 9 },
      label: "Nome",
      name: "nome",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 3 },
      label: "Sigla",
      name: "sigla",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Responsável",
      name: "responsavel",
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Cliente",
      name: "idCliente",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Código da área",
      name: "codigoArea",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Tipo",
      name: "tipo",
      tipo: "select",
      selectItems: [
        { label: "Área", value: "Área" },
        { label: "Departamento", value: "Departamento" },
      ],
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Descrição",
      name: "descricao",
      rows: 3,
    },
  ];

  const handleClose = () => fecharModal(nomeModal);

  const handleChange = ({ name, value }) =>
    setDados((prev) => ({ ...prev, [name]: value }));

  const handleApply = (event) => {
    event.preventDefault();
    salvarAreaDepartamento(dados);
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
            {editando ? "Editando" : "Criando"} área e/ou departamento
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

export default AreaDepartamentoModalForm;
