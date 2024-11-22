import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getClientes } from "../../database/dbCliente";
import ClienteModalForm from "./ClienteModalForm";
import { useState } from "react";
import { normalizarTelefone } from "../../utils/utils";

const Cliente = () => {
  const clientes = useSelector((state) => state?.cliente);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const camposFiltro = [
    {
      tamanhoGrid: { md: 12 },
      label: "Nome",
      name: "nomeSemPontuacao",
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
    },
    {
      tamanhoGrid: { md: 6 },
      label: "Telefone",
      name: "telefone",
      mask: "telefone",
    },
  ];

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <ClienteModalForm itemDetalhe={itemDetalhe} />
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...clientes}
          titulo="Clientes"
          colunas={[
            { nome: "Nome", valor: "nome" },
            { nome: "Email", valor: "email" },
            {
              nome: "Telefone",
              valor: "telefone",
              formato: (v) => normalizarTelefone(v),
            },
            { nome: "Observações", valor: "observacoes" },
          ]}
          camposFiltro={camposFiltro}
          acao={getClientes}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
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
