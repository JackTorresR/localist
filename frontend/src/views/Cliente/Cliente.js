import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { useEffect } from "react";
import { getClientes } from "../../database/dbCliente";

const Cliente = () => {
  const clientes = useSelector((state) => state?.cliente);

  useEffect(() => {
    const fetchData = async () => getClientes();

    fetchData();
  }, []);

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
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
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
        />
      </div>
    </div>
  );
};

export default Cliente;
