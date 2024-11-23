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
      mostrarColuna: false,
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
      mostrarColuna: false,
    },
    {
      tamanhoGrid: { md: 6 },
      label: "CPF/CNPJ",
      name: "cpfCnpj",
      mask: "cpfCnpj",
      formatar: (item) => normalizarDocumento(item),
      mostrarColuna: false,
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Telefone",
      name: "telefone",
      mask: "telefone",
      formatar: (item) => normalizarTelefone(item),
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

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <FormModal
          campos={campos}
          entidade="cliente"
          onSubmit={handleSubmit}
          itemDetalhe={itemDetalhe}
          onClose={() => setItemDetalhe({})}
        />
        <InfoModal
          campos={campos}
          dados={itemDetalhe}
          nomeModal="cliente-modal-info"
          titulo="Informações do Cliente"
        />
        <ConfirmarAcaoModal
          nomeRegistro={itemDetalhe?.nome}
          nomeModal="cliente-modal-delete"
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
          colunas={campos}
          camposFiltro={campos}
          acao={getClientes}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
          acaoRemover={(item) => {
            setItemDetalhe(item);
            abrirModal("cliente-modal-delete");
          }}
          acaoDetalhar={(item) => {
            setItemDetalhe(item);
            abrirModal("cliente-modal-info");
          }}
          acaoEditar={(item) => {
            setItemDetalhe(item);
            abrirModal("cliente-modal-form");
          }}
          onAdd={() => {
            setItemDetalhe({});
            abrirModal("cliente-modal-form");
          }}
        />
      </div>
    </div>
  );
};

export default Cliente;
