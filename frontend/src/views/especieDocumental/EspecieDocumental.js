import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
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

const EspecieDocumental = () => {
  const especiesDocumentais = useSelector((state) => state?.especieDocumental);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const handleSubmit = (dados) => {
    salvarEspecieDocumental(dados);
    setItemDetalhe({});
  };

  const entidade = "especieDocumental";
  const campos = camposFormEspecieDocumental;
  const propsComponentes = { campos, entidade, itemDetalhe };
  const tituloCard =
    (dadoExiste(itemDetalhe?._id) ? "Editar" : "Criar") + " espécie documental";

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
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
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...especiesDocumentais}
          titulo="Espécies documentais"
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
      </div>
    </div>
  );
};

export default EspecieDocumental;
