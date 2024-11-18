import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";

const EspecieDocumental = () => {
  return (
    <div style={Estilos.containerPrincipal}>
      <TiThMenu
        onClick={() => abrirModal("drawer")}
        size={40}
        style={Estilos.clicavel}
      />
      <div style={{ flex: 11, ...Estilos.containerFlexCentralizado }}>
        <h2>Espécie documental</h2>
      </div>
    </div>
  );
};

export default EspecieDocumental;
