import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import {
  getNotificacoes,
  informarDescarteCaixaArquivo,
} from "../../database/dbCaixaArquivo";
import InfoModal from "../../components/Modal/InfoModal";
import { useState } from "react";
import { normalizarData } from "../../utils/utils";
import ConfirmarAcaoModal from "../../components/Modal/ConfirmarAcaoModal";

const Notificacao = () => {
  const notificacoes = useSelector((state) => state?.notificacao);
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

  const entidade = "notificacao";
  const propsComponentes = { campos, entidade, itemDetalhe };

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <InfoModal
          {...propsComponentes}
          titulo="Informações da caixa de arquivos"
        />
        <ConfirmarAcaoModal
          {...propsComponentes}
          descricao="Tem certeza que deseja informar o descarte?"
          nomeAlternativoModal="descarte-modal-update"
          acao={() => informarDescarteCaixaArquivo(itemDetalhe?._id)}
        />
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...notificacoes}
          titulo="Notificações"
          colunas={[
            { name: "Ano", value: "anoDocumentos", alinhar: "center" },
            {
              name: "Expiração",
              alinhar: "center",
              formatar: (item) => normalizarData(item?.dataExpiracao),
            },
            { name: "Espécie", value: "nomeEspecieDocumental" },
            { name: "Cliente", value: "nomeCliente" },
            { name: "Observações", value: "observacoes" },
          ]}
          acao={getNotificacoes}
          camposFiltro={campos}
          exibirFiltro={true}
          botoesExtrasAcao={[
            {
              titulo: "Descartar",
              acao: (item) => {
                setItemDetalhe(item);
                abrirModal("descarte-modal-update");
              },
            },
          ]}
          mostrarAcaoRemover={false}
          mostrarAcaoEditar={false}
          acaoDetalhar={(item) => {
            setItemDetalhe(item);
            abrirModal(`${entidade}-modal-info`);
          }}
        />
      </div>
    </div>
  );
};

export default Notificacao;
