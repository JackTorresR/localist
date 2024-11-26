import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import {
  camposFormCaixaArquivo,
  colunasTabelaCaixaArquivo,
  getCaixasArquivo,
  informarDescarteCaixaArquivo,
  removerCaixaArquivo,
  salvarCaixaArquivo,
} from "../../database/dbCaixaArquivo";
import { useState } from "react";
import FormModal from "../../components/Modal/FormModal";
import InfoModal from "../../components/Modal/InfoModal";
import ConfirmarAcaoModal from "../../components/Modal/ConfirmarAcaoModal";
import { dadoExiste, normalizarData } from "../../utils/utils";

const CaixaArquivo = () => {
  const caixasArquivos = useSelector((state) => state?.caixaArquivo);
  const [itemDetalhe, setItemDetalhe] = useState({});

  const handleSubmit = (dados) => {
    salvarCaixaArquivo(dados);
    setItemDetalhe({});
  };

  const entidade = "caixaArquivo";
  const campos = camposFormCaixaArquivo;
  const propsComponentes = { campos, entidade, itemDetalhe };
  const tituloCard =
    (dadoExiste(itemDetalhe?._id) ? "Editar" : "Criar") + " caixa de arquivo";

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
          titulo="Informações da caixa de arquivos"
        />
        <ConfirmarAcaoModal
          {...propsComponentes}
          acao={() => removerCaixaArquivo(itemDetalhe?._id)}
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
          {...caixasArquivos}
          titulo="Caixas de arquivos"
          colunas={colunasTabelaCaixaArquivo}
          acao={getCaixasArquivo}
          camposFiltro={campos}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
          botoesExtrasAcao={[
            {
              titulo: "Descartar",
              acao: (item) => {
                setItemDetalhe(item);
                abrirModal("descarte-modal-update");
              },
              condicional: (item) => item?.situacao === "Aguardando descarte",
            },
          ]}
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
              dataArmazenamento: normalizarData(
                item?.dataArmazenamento,
                "YYYY-MM-DD"
              ),
              dataExpiracao: normalizarData(item?.dataExpiracao, "YYYY-MM-DD"),
            });
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

export default CaixaArquivo;
