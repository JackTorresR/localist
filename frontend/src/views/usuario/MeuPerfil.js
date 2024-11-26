import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import CORES from "../../styles/Cores";
import avatarPlaceholder from "../../assets/avatar_placeholder.png";
import { buscarImagensUsuarios, salvarImagem } from "../../database/dbUsuario";

const MeuPerfil = () => {
  const usuarioLogado = useSelector((state) => state?.auth);
  const nomeUsuario = usuarioLogado?.nome || "Sem Nome";
  const matricula = usuarioLogado?.matricula || "12345";
  const perfilAcesso = usuarioLogado?.perfilAcesso || "Usuário";
  const funcao = usuarioLogado?.funcao || "Desenvolvedor";

  // const [hover, setHover] = useState(false);
  const [imagemUsuario, setImagemUsuario] = useState(avatarPlaceholder);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const carregarImagem = async () => {
      const imagens = await buscarImagensUsuarios(usuarioLogado);
      setImagemUsuario(imagens[0]?.url || avatarPlaceholder);
    };

    carregarImagem();
  }, [usuarioLogado]);

  const handleImageUpload = (event) => {
    try {
      salvarImagem(event);
    } catch (error) {
      console.error("Erro ao salvar imagem:", error);
    }
  };

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
                // cursor: "pointer",
              }}
              // onMouseEnter={() => setHover(true)}
              // onMouseLeave={() => setHover(false)}
              // onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={imagemUsuario}
                alt="Imagem do usuário"
                style={{
                  width: "100%",
                  height: "auto",
                  // opacity: hover ? 0.5 : 1,
                  transition: "opacity 0.3s ease",
                }}
              />
              {/* {hover && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: CORES.PRETO,
                    fontSize: 36,
                  }}
                >
                  <ImFilePicture />
                </div>
              )} */}
            </div>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
            />
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
