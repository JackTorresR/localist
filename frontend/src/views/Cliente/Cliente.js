import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import {
  getClientes,
  removerCliente,
  salvarCliente,
} from "../../database/dbCliente";
import { useState } from "react";
import { normalizarDocumento, normalizarTelefone } from "../../utils/utils";
import ConfirmarAcaoModal from "../../components/Modal/ConfirmarAcaoModal";
import InfoModal from "../../components/Modal/InfoModal";
import FormModal from "../../components/Modal/FormModal";

const Cliente = () => {
  const clientes = useSelector((state) => state?.cliente);
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
      label: "Email",
      name: "email",
    },
    {
      tamanhoGrid: { md: 12 },
      label: "Endereço",
      name: "endereco",
    },
    {
      tamanhoGrid: { md: 6 },
      label: "CPF/CNPJ",
      name: "cpfCnpj",
      mask: "cpfCnpj",
      formatar: (item) => normalizarDocumento(item?.cpfCnpj),
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Telefone",
      name: "telefone",
      mask: "telefone",
      formatar: (item) => normalizarTelefone(item?.telefone),
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
    salvarCliente(dados);
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
        <InfoModal {...propsComponentes} titulo="Informações do cliente" />
        <ConfirmarAcaoModal
          {...propsComponentes}
          acao={() => removerCliente(itemDetalhe?._id)}
        />
        <TiThMenu
          size={40}
          style={Estilos.clicavel}
          onClick={() => abrirModal("drawer")}
        />
        <TabelaCustomizada
          {...clientes}
          titulo="Clientes"
          colunas={[
            { name: "Nome", value: "nome" },
            { name: "Email", value: "email" },
            {
              name: "Telefone",
              value: "telefone",
              formatar: (item) => normalizarTelefone(item),
            },
            { name: "Observações", value: "observacoes" },
          ]}
          camposFiltro={campos}
          acao={getClientes}
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

export default Cliente;
