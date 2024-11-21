import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getUsuarios } from "../../database/dbUsuario";
import UsuarioModalForm from "./UsuarioForm";
import { useState } from "react";

const Usuario = () => {
  const usuarios = useSelector((state) => state?.usuario);
  const [usuarioDetalhe, setUsuarioDetalhe] = useState({});

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <UsuarioModalForm usuarioDetalhe={usuarioDetalhe} />
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...usuarios}
          titulo="Usuários"
          colunas={[
            { nome: "Nome", valor: "nome" },
            { nome: "Email", valor: "email" },
            { nome: "Telefone", valor: "telefone" },
            { nome: "Perfil", valor: "perfilAcesso" },
          ]}
          acao={getUsuarios}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
          onAdd={() => {
            setUsuarioDetalhe({});
            abrirModal("usuario-modal-form");
          }}
        />
      </div>
    </div>
  );
};

export default Usuario;
