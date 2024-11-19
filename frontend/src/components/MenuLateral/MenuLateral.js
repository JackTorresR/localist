import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { fecharModal } from "../../redux/acoes/acoesModal";
import { IoMdLock } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { IoPerson } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaUserLarge } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoFileTrayFullSharp } from "react-icons/io5";
import { TiDropbox } from "react-icons/ti";
import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";
import TooltipAplicavel from "../Tooltip/TooltipAplicavel";
import { sairDoSistema } from "../../database/dbAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MenuLateral = () => {
  const navigate = useNavigate();
  const drawerAberto = useSelector((state) => state?.modal?.["drawer"]);

  const acoesRapidas = [
    {
      Icon: IoMdLock,
      descricao: "Mudar a senha",
      acao: () => navigate("/alterar-senha"),
    },
    { Icon: ImExit, descricao: "Sair do sistema", acao: () => sairDoSistema() },
    {
      Icon: IoPerson,
      descricao: "Meu perfil",
      acao: () => navigate("/meu-perfil"),
    },
    {
      Icon: MdNotificationsActive,
      descricao: "Minhas notificações",
      acao: () => navigate("/notificacao"),
    },
  ];

  const botoesMenu = [
    {
      Icon: IoIosPeople,
      iconeTamanho: 28,
      nome: "Clientes",
      acao: () => navigate("/"),
    },
    {
      Icon: FaUserLarge,
      iconeTamanho: 20,
      nome: "Usuários",
      acao: () => navigate("/usuario"),
    },
    {
      Icon: FaMapLocationDot,
      nome: "Áreas",
      acao: () => navigate("/area"),
    },
    {
      Icon: IoFileTrayFullSharp,
      nome: "Espécie Documental",
      acao: () => navigate("/especie-documental"),
    },
    {
      Icon: TiDropbox,
      iconeTamanho: 30,
      nome: "Caixas de Arquivos",
      acao: () => navigate("/caixa-arquivo"),
    },
  ];

  return (
    <Drawer
      open={drawerAberto}
      onClose={() => fecharModal("drawer")}
      anchor="left"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          backgroundColor: CORES.CINZA_PADRAO,
          padding: "20px 10px",
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={2}
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Avatar
            alt="Imagem do usuário"
            src="https://randomuser.me/api/portraits/lego/5.jpg"
            sx={{ width: 80, height: 80, marginRight: 2 }}
          />
          <ListItemText primary="Cássio Oliveira" />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: CORES.CINZA_ESCURO,
          padding: "10px",
          borderRadius: "10px",
          marginBottom: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          {acoesRapidas.map(
            (item, index) =>
              item?.descricao && (
                <TooltipAplicavel titulo={item?.descricao} key={index}>
                  <ListItem
                    button={1}
                    style={Estilos.clicavel}
                    onClick={() =>
                      item?.acao
                        ? item?.acao()
                        : toast.error(`🚧 '${item?.descricao}' em construção!`)
                    }
                  >
                    <item.Icon size={25} />
                  </ListItem>
                </TooltipAplicavel>
              )
          )}
        </Box>
      </Box>
      <List>
        {botoesMenu.map((item, index) => (
          <ListItem
            button={1}
            key={index}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.25)" }}
            style={Estilos.clicavel}
            onClick={() =>
              item?.acao
                ? item?.acao()
                : toast.error(`🚧 '${item?.nome}' em construção!`)
            }
          >
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
                width: 36,
                height: 36,
              }}
            >
              <item.Icon size={item?.iconeTamanho || 25} />
            </div>
            <ListItemText primary={item?.nome} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default MenuLateral;