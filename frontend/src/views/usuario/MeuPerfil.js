import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";

const MeuPerfil = () => {
  return (
    <div style={Estilos.containerPrincipal}>
      <TiThMenu
        onClick={() => abrirModal("drawer")}
        size={40}
        style={Estilos.clicavel}
      />
      <div style={{ flex: 11, ...Estilos.containerFlexCentralizado }}>
        <h2>Meu perfil</h2>
      </div>
    </div>
  );
};

export default MeuPerfil;