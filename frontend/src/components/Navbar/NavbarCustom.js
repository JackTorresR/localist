import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { GiHamburgerMenu } from "react-icons/gi";
import CORES from "../../styles/Cores";
import { useSelector } from "react-redux";
import { separarPrimeiroNome } from "../../utils/utils";
import MenuLateral from "../MenuLateral/MenuLateral";
import { abrirModal } from "../../redux/acoes/acoesModal";

const NavbarCustom = () => {
  const nomeFuncionarioLogado = separarPrimeiroNome(
    useSelector((state) => state?.auth?.nome || "Funcionário")
  );

  const handleDrawerOpen = () => {
    abrirModal("drawer");
  };

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
            fontSize={36}
            // sx={{ display: { xs: "none", sm: "block", md: "block" } }}
          >
            {`Olá, ${nomeFuncionarioLogado}!`}
          </Typography>
          {/* <Box
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              flexGrow: 1,
              ml: 3,
            }}
          >
            {BOTOES_ACAO_GERENCIAMENTO()?.map((item, ix) => (
              <ButtonTopNavbar item={item} key={`${ix}_navBar_topo`} />
            ))}
          </Box>
          <ButtonTopNavbar
            item={botaoSair}
            extraConfig={{
              sx: { display: { xs: "none", sm: "none", md: "block" } },
              style: { marginRight: -24 },
            }}
          /> */}
        </Toolbar>
      </AppBar>
      <MenuLateral />
    </Box>
  );
};

export default NavbarCustom;
