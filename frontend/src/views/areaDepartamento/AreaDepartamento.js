import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getAreasDepartamentos } from "../../database/dbAreaDepartamento";

const AreaDepartamento = () => {
  const areasDepartamentos = useSelector((state) => state?.areaDepartamento);

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...areasDepartamentos}
          titulo="Áreas e departamentos"
          colunas={[
            { nome: "Código", valor: "codigoArea" },
            { nome: "Tipo", valor: "tipo" },
            { nome: "Nome", valor: "nome" },
            { nome: "Cliente", valor: "nomeCliente" },
            { nome: "Descrição", valor: "descricao" },
          ]}
          acao={getAreasDepartamentos}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
        />
      </div>
    </div>
  );
};

export default AreaDepartamento;
