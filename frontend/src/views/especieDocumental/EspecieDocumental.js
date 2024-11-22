import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getEspeciesDocumentais } from "../../database/dbEspecieDocumental";
import { calcularTempo } from "../../utils/utils";
import EspecieDocumentalModalForm from "./EspecieDocumentalModalForm";
import { useState } from "react";

const EspecieDocumental = () => {
  const especiesDocumentais = useSelector((state) => state?.especieDocumental);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const camposFiltro = [
    {
      tamanhoGrid: { md: 12 },
      label: "Nome",
      name: "nomeSemPontuacao",
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Área/Departamento",
      name: "idAreaDepartamento",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Retenção",
      name: "retencao",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Tipo retenção",
      name: "tipoRetencao",
      tipo: "select",
      selectItems: [
        { label: "Dia", value: "Dia" },
        { label: "Mês", value: "Mês" },
        { label: "Ano", value: "Ano" },
      ],
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Categoria",
      name: "categoria",
      tipo: "select",
      selectItems: [
        { label: "Pessoal", value: "Pessoal" },
        { label: "Empresarial", value: "Empresarial" },
        { label: "Fiscal", value: "Fiscal" },
        { label: "Outros", value: "Outros" },
      ],
    },
  ];

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <EspecieDocumentalModalForm itemDetalhe={itemDetalhe} />
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
              formato: (item) => calcularTempo(item),
            },
            { nome: "Descrição", valor: "descricao" },
          ]}
          acao={getEspeciesDocumentais}
          camposFiltro={camposFiltro}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
          onAdd={() => {
            setItemDetalhe({});
            abrirModal("especieDocumental-modal-form");
          }}
        />
      </div>
    </div>
  );
};

export default EspecieDocumental;
