import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";

const Cliente = () => {
  return (
    <div style={Estilos.containerPrincipal}>
      <TiThMenu
        onClick={() => abrirModal("drawer")}
        size={40}
        style={Estilos.clicavel}
      />
      <div style={{ flex: 11, ...Estilos.containerFlexCentralizado }}>
        <h2>Cliente</h2>
      </div>
    </div>
  );
};

export default Cliente;
