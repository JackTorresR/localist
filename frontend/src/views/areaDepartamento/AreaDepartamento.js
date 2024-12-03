import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import {
  camposFormAreaDepartamento,
  colunasTabelaAreaDepartamento,
  getAreasDepartamentos,
  removerAreaDepartamento,
  salvarAreaDepartamento,
} from "../../database/dbAreaDepartamento";
import { useState } from "react";
import FormModal from "../../components/Modal/FormModal";
import InfoModal from "../../components/Modal/InfoModal";
import ConfirmarAcaoModal from "../../components/Modal/ConfirmarAcaoModal";
import { dadoExiste } from "../../utils/utils";
import {} from "../../database/dbCliente";
import { Box } from "@mui/material";

const AreaDepartamento = () => {
  const areasDepartamentos = useSelector((state) => state?.areaDepartamento);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const handleSubmit = (dados) => {
    salvarAreaDepartamento(dados);
    setItemDetalhe({});
  };

  const entidade = "AREA_DEPARTAMENTO";
  const campos = camposFormAreaDepartamento;
  const propsComponentes = { campos, entidade, itemDetalhe };
  const tituloCard =
    (dadoExiste(itemDetalhe?._id) ? "Editar" : "Criar") +
    " área ou departamento";

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
        titulo="Informações da área ou departamento"
      />
      <ConfirmarAcaoModal
        {...propsComponentes}
        acao={() => removerAreaDepartamento(itemDetalhe?._id)}
      />
      <TabelaCustomizada
        {...areasDepartamentos}
        titulo="Áreas e departamentos"
        entidade={entidade}
        colunas={colunasTabelaAreaDepartamento}
        acao={getAreasDepartamentos}
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

export default AreaDepartamento;
