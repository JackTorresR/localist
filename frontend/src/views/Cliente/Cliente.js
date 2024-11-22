import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getClientes } from "../../database/dbCliente";
import ClienteModalForm from "./ClienteModalForm";
import { useState } from "react";

const Cliente = () => {
  const clientes = useSelector((state) => state?.cliente);
  const [itemDetalhe, setItemDetalhe] = useState({});

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
            { nome: "Telefone", valor: "telefone" },
            { nome: "Observações", valor: "observacoes" },
          ]}
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
