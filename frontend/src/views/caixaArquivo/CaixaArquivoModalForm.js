import { Modal, Card, Typography, Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { fecharModal } from "../../redux/acoes/acoesModal";
import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";
import { dadoExiste } from "../../utils/utils";
import Formulario from "../../components/Formularios/Formulario";
import { useState } from "react";
import { salvarCaixaArquivo } from "../../database/dbCaixaArquivo";

const nomeModal = "caixaArquivo-modal-form";
const CaixaArquivoModalForm = (props = {}) => {
  const { itemDetalhe = {} } = props;

  const open = useSelector((state) => state?.modal?.[nomeModal]) || false;
  const [dados, setDados] = useState(itemDetalhe);

  const editando = dadoExiste(itemDetalhe?._id);

  const campos = [
    {
      tamanhoGrid: { md: 6 },
      label: "Identificador",
      name: "identificador",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Ano dos documentos",
      name: "anoDocumentos",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Localização",
      name: "localizacao",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Cliente",
      name: "idCliente",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Espécie documental",
      name: "idEspecieDocumental",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Data armazenamento",
      name: "dataArmazenamento",
      tipo: "date",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Data expiração",
      name: "dataExpiracao",
      tipo: "date",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Situação",
      name: "situacao",
      tipo: "select",
      obrigatorio: true,
      selectItems: [
        { label: "Em Prazo", value: "Em Prazo" },
        { label: "Aguardando descarte", value: "Aguardando descarte" },
        { label: "Descartado", value: "Descartado" },
      ],
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
    salvarCaixaArquivo(dados);
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
            {editando ? "Editando" : "Criando"} caixa de arquivos
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

export default CaixaArquivoModalForm;
