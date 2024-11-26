import { useSelector } from "react-redux";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import CORES from "../../styles/Cores";
import avatarPlaceholder from "../../assets/avatar_placeholder.png";

const MeuPerfil = () => {
  const usuarioLogado = useSelector((state) => state?.auth);
  const nomeUsuario = usuarioLogado?.nome || "Sem Nome";
  const matricula = usuarioLogado?.matricula || "12345";
  const perfilAcesso = usuarioLogado?.perfilAcesso || "Usuário";
  const funcao = usuarioLogado?.funcao || "Desenvolvedor";

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <div
          style={{
            ...Estilos.containerFlexCentralizado,
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: 300,
              padding: 20,
              display: "flex",
              borderRadius: 8,
              textAlign: "center",
              flexDirection: "column",
              background:
                "linear-gradient(to bottom, #868686 50%, #D9D9D9 50%)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <span style={{ fontSize: 20 }}>Olá, me chamo</span>
            <span style={{ fontSize: 28, fontWeight: "bold" }}>
              {nomeUsuario}
            </span>
            <div
              style={{
                position: "relative",
                width: 180,
                height: 180,
                overflow: "hidden",
                margin: "20px auto",
                borderRadius: "50%",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                backgroundColor: CORES.BRANCO,
              }}
            >
              <img
                src={avatarPlaceholder}
                alt="Imagem do usuário"
                style={{
                  width: "100%",
                  height: "auto",
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>
            <span style={{ fontSize: 20 }}>{matricula}</span>
            <span style={{ fontWeight: "bold", fontSize: 20 }}>
              {perfilAcesso}
            </span>
            <span style={{ margin: 5, fontSize: 22 }}>{funcao}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeuPerfil;
