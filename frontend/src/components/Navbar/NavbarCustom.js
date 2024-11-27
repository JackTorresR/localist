import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { GiHamburgerMenu } from "react-icons/gi";
import CORES from "../../styles/Cores";
import { useSelector } from "react-redux";
import { dadoExiste, separarPrimeiroNome } from "../../utils/utils";
import MenuLateral from "../MenuLateral/MenuLateral";
import { abrirModal } from "../../redux/acoes/acoesModal";

const NavbarCustom = () => {
  const usuarioLogado = useSelector((state) => state?.auth);
  const jaLogado = dadoExiste(usuarioLogado?._id);
  if (!jaLogado) return null;

  const nomeFuncionarioLogado = separarPrimeiroNome(usuarioLogado?.nome);
  const handleDrawerOpen = () => abrirModal("drawer");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" style={{ background: CORES.BACKGROUND_GRADIENT }}>
        <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            size="large"
            sx={{ mr: 2 }}
          >
            <GiHamburgerMenu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            noWrap
            color={CORES.PRETO_ALT}
            fontSize={26}
          >
            {`Olá, ${nomeFuncionarioLogado}!`}
          </Typography>
        </Toolbar>
      </AppBar>
      <MenuLateral />
    </Box>
  );
};

export default NavbarCustom;
