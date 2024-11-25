import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import {
  getEspeciesDocumentais,
  removerEspecieDocumental,
  salvarEspecieDocumental,
} from "../../database/dbEspecieDocumental";
import { calcularTempo } from "../../utils/utils";
import { useState } from "react";
import ConfirmarAcaoModal from "../../components/Modal/ConfirmarAcaoModal";
import FormModal from "../../components/Modal/FormModal";
import InfoModal from "../../components/Modal/InfoModal";
import {
  camposFormAreaDepartamento,
  colunasTabelaAreaDepartamento,
  getAreasDepartamentos,
  salvarAreaDepartamento,
} from "../../database/dbAreaDepartamento";

const EspecieDocumental = () => {
  const especiesDocumentais = useSelector((state) => state?.especieDocumental);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const campos = [
    {
      tamanhoGrid: { md: 12 },
      label: "Nome",
      name: "nome",
      filtravel: false,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Nome sem pontuação",
      name: "nomeSemPontuacao",
      mostrarFormulario: false,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Área/Departamento",
      name: "nomeAreaDepartamento",
      componente: {
        acao: getAreasDepartamentos,
        entidade: "areaDepartamento",
        campoId: "idAreaDepartamento",
        acaoSalvar: salvarAreaDepartamento,
        campos: camposFormAreaDepartamento,
        colunas: colunasTabelaAreaDepartamento,
      },
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Retenção",
      name: "retencao",
      formatar: (item) =>
        calcularTempo({
          retencao: item?.retencao,
          tipoRetencao: item?.tipoRetencao,
        }),
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
    {
      tamanhoGrid: { md: 12 },
      label: "Descrição",
      name: "descricao",
      rows: 3,
      filtravel: false,
    },
  ];

  const handleSubmit = (dados) => {
    salvarEspecieDocumental(dados);
    setItemDetalhe({});
  };

  const entidade = "cliente";
  const propsComponentes = { campos, entidade, itemDetalhe };

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <FormModal
          {...propsComponentes}
          onSubmit={handleSubmit}
          onClose={() => setItemDetalhe({})}
        />
        <InfoModal
          {...propsComponentes}
          titulo="Informações da espécie documental"
        />
        <ConfirmarAcaoModal
          {...propsComponentes}
          acao={() => removerEspecieDocumental(itemDetalhe?._id)}
        />
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...especiesDocumentais}
          titulo="Espécies documentais"
          colunas={[
            { name: "Nome", value: "nome" },
            { name: "Área", value: "nomeAreaDepartamento" },
            {
              name: "Retenção",
              formatar: (item) => calcularTempo(item),
            },
            { name: "Descrição", value: "descricao" },
          ]}
          acao={getEspeciesDocumentais}
          camposFiltro={campos}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
          acaoRemover={(item) => {
            setItemDetalhe(item);
            abrirModal(`${entidade}-modal-delete`);
          }}
          acaoDetalhar={(item) => {
            setItemDetalhe(item);
            abrirModal(`${entidade}-modal-info`);
          }}
          acaoEditar={(item) => {
            setItemDetalhe(item);
            abrirModal(`${entidade}-modal-form`);
          }}
          onAdd={() => {
            setItemDetalhe({});
            abrirModal(`${entidade}-modal-form`);
          }}
        />
      </div>
    </div>
  );
};

export default EspecieDocumental;
