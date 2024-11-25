import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import {
  getCaixasArquivo,
  removerCaixaArquivo,
  salvarCaixaArquivo,
} from "../../database/dbCaixaArquivo";
import { useState } from "react";
import FormModal from "../../components/Modal/FormModal";
import InfoModal from "../../components/Modal/InfoModal";
import ConfirmarAcaoModal from "../../components/Modal/ConfirmarAcaoModal";
import { normalizarData } from "../../utils/utils";

const CaixaArquivo = () => {
  const caixasArquivos = useSelector((state) => state?.caixaArquivo);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const campos = [
    {
      tamanhoGrid: { md: 6 },
      label: "Identificador",
      name: "identificador",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Ano dos documentos",
      name: "anoDocumentos",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Localização",
      name: "localizacao",
      obrigatorio: true,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Cliente",
      name: "idCliente",
      obrigatorio: true,
      formatar: (item) => item?.nomeCliente,
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Espécie documental",
      name: "idEspecieDocumental",
      obrigatorio: true,
      formatar: (item) => item?.nomeEspecieDocumental,
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Data armazenamento",
      name: "dataArmazenamento",
      tipo: "date",
      obrigatorio: true,
      formatar: (item) => normalizarData(item?.dataArmazenamento),
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Data expiração",
      name: "dataExpiracao",
      tipo: "date",
      obrigatorio: true,
      formatar: (item) => normalizarData(item?.dataExpiracao),
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Situação",
      name: "situacao",
      tipo: "select",
      obrigatorio: true,
      selectItems: [
        { label: "Em Prazo", value: "Em Prazo" },
        { label: "Aguardando descarte", value: "Aguardando descarte" },
        { label: "Descartado", value: "Descartado" },
      ],
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Observações",
      name: "observacoes",
      rows: 3,
      filtravel: false,
    },
  ];

  const handleSubmit = (dados) => {
    salvarCaixaArquivo(dados);
    setItemDetalhe({});
  };

  const entidade = "caixa-arquivo";
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
          titulo="Informações da caixa de arquivos"
        />
        <ConfirmarAcaoModal
          {...propsComponentes}
          acao={() => removerCaixaArquivo(itemDetalhe?._id)}
        />
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...caixasArquivos}
          titulo="Caixas de arquivos"
          colunas={[
            { name: "Ano", value: "anoDocumentos", alinhar: "center" },
            {
              name: "Expiração",
              alinhar: "center",
              formatar: (item) => normalizarData(item?.dataExpiracao),
            },
            { name: "Espécie", value: "nomeEspecieDocumental" },
            { name: "Cliente", value: "nomeCliente" },
            { name: "Situação", value: "situacao" },
            { name: "Observações", value: "observacoes" },
          ]}
          acao={getCaixasArquivo}
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
            setItemDetalhe({
              ...item,
              dataArmazenamento: normalizarData(item?.dataArmazenamento),
              dataExpiracao: normalizarData(item?.dataExpiracao),
            });
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

export default CaixaArquivo;
