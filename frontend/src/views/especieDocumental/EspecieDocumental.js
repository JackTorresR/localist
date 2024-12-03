import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import {
  camposFormEspecieDocumental,
  colunasTabelaEspecieDocumental,
  getEspeciesDocumentais,
  removerEspecieDocumental,
  salvarEspecieDocumental,
} from "../../database/dbEspecieDocumental";
import { useState } from "react";
import ConfirmarAcaoModal from "../../components/Modal/ConfirmarAcaoModal";
import FormModal from "../../components/Modal/FormModal";
import InfoModal from "../../components/Modal/InfoModal";
import {} from "../../database/dbAreaDepartamento";
import { dadoExiste } from "../../utils/utils";
import { Box } from "@mui/material";

const EspecieDocumental = () => {
  const especiesDocumentais = useSelector((state) => state?.especieDocumental);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const handleSubmit = (dados) => {
    salvarEspecieDocumental(dados);
    setItemDetalhe({});
  };

  const entidade = "ESPECIE_DOCUMENTAL";
  const campos = camposFormEspecieDocumental;
  const propsComponentes = { campos, entidade, itemDetalhe };
  const tituloCard =
    (dadoExiste(itemDetalhe?._id) ? "Editar" : "Criar") + " espécie documental";

  return (
    <Box style={Estilos.containerPrincipal}>
      <FormModal
        {...propsComponentes}
        tituloCard={tituloCard}
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
      <TabelaCustomizada
        {...especiesDocumentais}
        titulo="Espécies documentais"
        entidade={entidade}
        colunas={colunasTabelaEspecieDocumental}
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
    </Box>
  );
};

export default EspecieDocumental;
