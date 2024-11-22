import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getAreasDepartamentos } from "../../database/dbAreaDepartamento";
import { useState } from "react";
import AreaDepartamentoModalForm from "./AreaDepartamentoModalForm";

const AreaDepartamento = () => {
  const areasDepartamentos = useSelector((state) => state?.areaDepartamento);
  const [itemDetalhe, setItemDetalhe] = useState({});

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <AreaDepartamentoModalForm itemDetalhe={itemDetalhe} />
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
          onAdd={() => {
            setItemDetalhe({});
            abrirModal("areaDepartamento-modal-form");
          }}
        />
      </div>
    </div>
  );
};

export default AreaDepartamento;
