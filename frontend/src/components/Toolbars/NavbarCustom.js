import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { GiHamburgerMenu } from "react-icons/gi";
import ButtonTopNavbar from "../Botoes/ButtonTopNavbar";
import ButtonLeftNavbar from "../Botoes/ButtonLeftNavbar";
import CORES from "../../styles/Cores";
import BOTOES_ACAO_GERENCIAMENTO from "../../data/botoesAcaoGerenciamento";
import { sairDoSistema } from "../../database/dbAuth";
import { useSelector } from "react-redux";
import { separarPrimeiroNome } from "../../utils/utils";

const drawerWidth = 240;

const NavbarCustom = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const nomeFuncionarioLogado = separarPrimeiroNome(
    useSelector((state) => state?.auth?.nome || "Funcionário")
  );

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };
  const botaoSair = { nome: "Desconectar", acao: () => sairDoSistema() };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        {`Olá, ${nomeFuncionarioLogado}! 👋`}
      </Typography>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {BOTOES_ACAO_GERENCIAMENTO()?.map((item, ix) => (
          <ButtonLeftNavbar item={item} key={`${ix}_navBar_drawer`} />
        ))}
      </List>
      <ButtonLeftNavbar
        item={botaoSair}
        extraConfig={{ sx: { position: "relative", bottom: 0, width: "100%" } }}
      />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" style={{ background: CORES.BACKGROUND_GRADIENT }}>
        <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "block", md: "none" } }}
          >
            <GiHamburgerMenu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{ display: { xs: "none", sm: "block", md: "block" } }}
          >
            {`Olá, ${nomeFuncionarioLogado}! 👋`}
          </Typography>
          <Box
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
          />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default NavbarCustom;
