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
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import avatarPlaceholder from "../../assets/avatar_placeholder.png";
import { buscarImagensUsuarios } from "../../database/dbUsuario";
import { sairDoSistema } from "../../database/dbAuth";

const MenuLateral = () => {
  const navigate = useNavigate();
  const usuarioLogado = useSelector((state) => state?.auth);
  const quantidadeNotificacoes = useSelector(
    (state) => state?.notificacao?.quantidade
  );
  const drawerAberto = useSelector((state) => state?.modal?.["drawer"]);
  const [imagemUsuario, setImagemUsuario] = useState(avatarPlaceholder);

  useEffect(() => {
    const carregarImagem = async () => {
      const imagens = await buscarImagensUsuarios(usuarioLogado);
      setImagemUsuario(imagens[0]?.url || avatarPlaceholder);
    };

    carregarImagem();
  }, [usuarioLogado]);

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
      quantitativo: true,
    },
  ];

  const botoesMenu = [
    {
      Icon: IoIosPeople,
      iconeTamanho: 28,
      nome: "Clientes",
      acao: () => navigate("/cliente"),
    },
    {
      Icon: FaUserLarge,
      iconeTamanho: 20,
      nome: "Usuários",
      acao: () => navigate("/usuario"),
    },
    {
      Icon: FaMapLocationDot,
      nome: "Áreas/Departamentos",
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

  const temMuitaNotificacao = quantidadeNotificacoes > 9;

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
            src={imagemUsuario}
            sx={{ width: 80, height: 80, marginRight: 2 }}
          />
          <ListItemText primary={usuarioLogado?.nome || "Usuário"} />
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
          {acoesRapidas.map((item, index) => {
            const temNotificacao =
              item?.quantitativo === true && quantidadeNotificacoes > 0;

            return (
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
                    <item.Icon
                      size={25}
                      color={temNotificacao ? CORES.BRANCO : CORES.PRETO}
                    />
                    {temNotificacao && (
                      <ListItemText
                        style={{
                          color: CORES.BRANCO,
                          position: "absolute",
                          right: temMuitaNotificacao ? -3 : 5,
                        }}
                        primary={
                          temMuitaNotificacao ? "9+" : quantidadeNotificacoes
                        }
                      />
                    )}
                  </ListItem>
                </TooltipAplicavel>
              )
            );
          })}
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
