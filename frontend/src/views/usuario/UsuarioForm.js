import { Modal, Card, Typography, Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { fecharModal } from "../../redux/acoes/acoesModal";
import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";
import { dadoExiste } from "../../utils/utils";
import Formulario from "../../components/Formularios/Formulario";
import { useState } from "react";
import { salvarUsuario } from "../../database/dbUsuario";

const nomeModal = "usuario-modal-form";
const UsuarioModalForm = (props = {}) => {
  const { usuarioDetalhe = {} } = props;

  const open = useSelector((state) => state?.modal?.[nomeModal]) || false;
  const [dados, setDados] = useState(usuarioDetalhe);

  const editando = dadoExiste(usuarioDetalhe?._id);

  const campos = [
    {
      tamanhoGrid: { md: 12 },
      label: "Nome completo",
      name: "nome",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Nome de usuário",
      name: "usuario",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Senha",
      name: "senha",
      tipo: "password",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Email",
      name: "email",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Matrícula",
      name: "matricula",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Função",
      name: "funcao",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Telefone",
      name: "telefone",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Perfil de acesso",
      name: "perfilAcesso",
      tipo: "select",
      selectItems: [
        { label: "Administrativo", value: "Administrativo" },
        { label: "Operacional", value: "Operacional" },
      ],
    },
  ];

  const handleClose = () => fecharModal(nomeModal);

  const handleChange = ({ name, value }) =>
    setDados((prev) => ({ ...prev, [name]: value }));

  const handleApply = (event) => {
    event.preventDefault();
    salvarUsuario(dados);
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
            {editando ? "Editando" : "Criando"} usuário
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

export default UsuarioModalForm;
