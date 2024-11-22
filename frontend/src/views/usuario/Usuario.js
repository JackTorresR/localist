import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getUsuarios } from "../../database/dbUsuario";
import UsuarioModalForm from "./UsuarioModalForm";
import { useState } from "react";

const Usuario = () => {
  const usuarios = useSelector((state) => state?.usuario);
  const [itemDetalhe, setItemDetalhe] = useState({});

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <UsuarioModalForm itemDetalhe={itemDetalhe} />
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
            setItemDetalhe({});
            abrirModal("usuario-modal-form");
          }}
        />
      </div>
    </div>
  );
};

export default Usuario;
