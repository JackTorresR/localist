import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getUsuarios } from "../../database/dbUsuario";

const Usuario = () => {
  const usuarios = useSelector((state) => state?.usuario);

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
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
        />
      </div>
    </div>
  );
};

export default Usuario;
