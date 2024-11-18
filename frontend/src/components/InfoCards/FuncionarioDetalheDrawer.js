import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Icon,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import FuncionarioDetalhe from "./FuncionarioDetalhe";
import { useSelector } from "react-redux";
import CORES from "../../styles/Cores";
import { fecharModal } from "../../redux/acoes/acoesModal";
import BOTOES_ACAO_FUNCIONARIO from "../../data/botoesAcaoFuncionario";
import { useNavigate } from "react-router-dom";

const nomeModal = "funcionario-detalhe-drawer";
const FuncionarioDetalheDrawer = () => {
  const navigate = useNavigate();

  const funcionario = useSelector((state) => state?.funcionario?.detalhe);
  const modalAberto = useSelector(
    (state) => state?.modal?.[nomeModal] === true
  );

  const botaoAcaoDrawer = ({ botao, ix }) => {
    return (
      <Button
        sx={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          lineHeight: "normal",
          backgroundColor: botao.cor,
          borderRadius: 0,
          minWidth: 161,
          minHeight: 75,
          ...botao?.sx,
          display: "flex",
        }}
        key={`${ix}_botao_acao_detalhe`}
        onClick={() => botao.acao(funcionario)}
      >
        <Icon sx={{ fontSize: 30, marginRight: 1, color: CORES.BRANCO }}>
          {botao.icone}
        </Icon>
        <Typography fontSize={30} color={CORES.BRANCO}>
          {botao.label}
        </Typography>
      </Button>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={modalAberto}
      onClose={() => fecharModal(nomeModal)}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => fecharModal(nomeModal)}
          >
            <MdClose />
          </IconButton>
          <Typography variant="h6">Detalhes do Funcionário</Typography>
        </Toolbar>
      </AppBar>
      <FuncionarioDetalhe
        sx={{ mt: 1, flexGrow: 1 }}
        avatarSx={{ width: "50%" }}
      />
      <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
        {BOTOES_ACAO_FUNCIONARIO(navigate)
          .filter((item) => item?.mostrarNaDrawer === true)
          .map((botao, ix) => botaoAcaoDrawer({ botao, ix }))}
      </Box>
    </Drawer>
  );
};

export default FuncionarioDetalheDrawer;
