import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import {
  camposFormCliente,
  getClientes,
  removerCliente,
  salvarCliente,
} from "../../database/dbCliente";
import { useState } from "react";
import {
  dadoExiste,
  normalizarData,
  normalizarTelefone,
} from "../../utils/utils";
import ConfirmarAcaoModal from "../../components/Modal/ConfirmarAcaoModal";
import InfoModal from "../../components/Modal/InfoModal";
import FormModal from "../../components/Modal/FormModal";
import { Box } from "@mui/material";

const Cliente = () => {
  const clientes = useSelector((state) => state?.cliente);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const handleSubmit = (dados) => {
    salvarCliente(dados);
    setItemDetalhe({});
  };

  const entidade = "CLIENTE";
  const campos = camposFormCliente;
  const propsComponentes = { campos, entidade, itemDetalhe };
  const tituloCard =
    (dadoExiste(itemDetalhe?._id) ? "Editar" : "Criar") + " cliente";

  return (
    <Box style={Estilos.containerPrincipal}>
      <FormModal
        {...propsComponentes}
        tituloCard={tituloCard}
        onSubmit={handleSubmit}
        onClose={() => setItemDetalhe({})}
      />
      <InfoModal {...propsComponentes} titulo="Informações do cliente" />
      <ConfirmarAcaoModal
        {...propsComponentes}
        acao={() => removerCliente(itemDetalhe?._id)}
      />
      <TabelaCustomizada
        {...clientes}
        titulo="Clientes"
        entidade={entidade}
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
          setItemDetalhe({
            ...item,
            dataContrato: normalizarData(item?.dataContrato, "YYYY-MM-DD"),
          });
          abrirModal(`${entidade}-modal-form`);
        }}
        onAdd={() => {
          setItemDetalhe({});
          abrirModal(`${entidade}-modal-form`);
        }}
      />
    </Box>
  );
};

export default Cliente;
