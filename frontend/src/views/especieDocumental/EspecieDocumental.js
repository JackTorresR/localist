import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getEspeciesDocumentais } from "../../database/dbEspecieDocumental";
import { calcularTempo } from "../../utils/utils";

const EspecieDocumental = () => {
  const especiesDocumentais = useSelector((state) => state?.especieDocumental);

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...especiesDocumentais}
          titulo="Espécies documentais"
          colunas={[
            { nome: "Nome", valor: "nome" },
            { nome: "Área", valor: "nomeAreaDepartamento" },
            {
              nome: "Retenção",
              valor: "retencao",
              formato: (item) => calcularTempo(item),
            },
            { nome: "Descrição", valor: "descricao" },
          ]}
          acao={getEspeciesDocumentais}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
        />
      </div>
    </div>
  );
};

export default EspecieDocumental;
