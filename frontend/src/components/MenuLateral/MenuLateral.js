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
import { sairDoSistema } from "../../database/dbAuth";
import { checarPermissao, dadoExiste } from "../../utils/utils";

const MenuLateral = () => {
  const navigate = useNavigate();
  const usuarioLogado = useSelector((state) => state?.auth);
  const quantidadeNotificacoes = useSelector(
    (state) => state?.notificacao?.quantidade
  );
  const drawerAberto = useSelector((state) => state?.modal?.["drawer"]);

  const filtrarPermissao = (lista = []) => {
    const listaFiltrada = lista?.filter((item = {}) => {
      const { permissao } = item;
      const temPermissao = !dadoExiste(permissao) || checarPermissao(permissao);

      return temPermissao;
    });

    return listaFiltrada;
  };

  const acoesRapidas = [
    {
      Icon: IoMdLock,
      descricao: "Mudar a senha",
      permissao: "USUARIO_ALTERAR_SENHA",
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
      permissao: "CAIXA_ARQUIVO_MENU",
      acao: () => navigate("/notificacao"),
      quantitativo: true,
    },
  ];

  const botoesMenu = [
    {
      Icon: IoIosPeople,
      iconeTamanho: 28,
      nome: "Clientes",
      permissao: "CLIENTE_MENU",
      acao: () => navigate("/cliente"),
    },
    {
      Icon: FaUserLarge,
      iconeTamanho: 20,
      nome: "Usuários",
      permissao: "USUARIO_MENU",
      acao: () => navigate("/usuario"),
    },
    {
      Icon: FaMapLocationDot,
      nome: "Áreas/Departamentos",
      permissao: "AREA_DEPARTAMENTO_MENU",
      acao: () => navigate("/area"),
    },
    {
      Icon: IoFileTrayFullSharp,
      nome: "Espécie Documental",
      permissao: "ESPECIE_DOCUMENTAL_MENU",
      acao: () => navigate("/especie-documental"),
    },
    {
      Icon: TiDropbox,
      iconeTamanho: 30,
      nome: "Caixas de Arquivos",
      permissao: "CAIXA_ARQUIVO_MENU",
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
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "50%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              backgroundColor: CORES.BRANCO,
            }}
          >
            <Avatar
              src={"/logo512.png"}
              alt="Imagem do usuário"
              sx={{ width: 80, height: 80 }}
            />
          </div>
          <ListItemText
            primary={usuarioLogado?.nome || "Usuário"}
            sx={{ marginLeft: 2 }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginBottom: 2,
          borderRadius: "10px",
          justifyContent: "center",
          backgroundColor: CORES.CINZA_ESCURO,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {filtrarPermissao(acoesRapidas)?.map((item, index) => {
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
                        style={{ color: CORES.BRANCO }}
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
        {filtrarPermissao(botoesMenu)?.map((item, index) => (
          <ListItem
            button={1}
            key={index}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.25)" }}
            style={Estilos.clicavel}
            onClick={() => {
              item?.acao
                ? item?.acao()
                : toast.error(`🚧 '${item?.nome}' em construção!`);
              fecharModal("drawer");
            }}
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
