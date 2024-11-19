import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getEspeciesDocumentais } from "../../database/dbEspecieDocumental";
import { calcularTempo } from "../../utils/utils";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // Certifique-se de que a localidade está carregada
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.locale("pt-br");

const EspecieDocumental = () => {
  const especiesDocumentais = useSelector((state) => state?.especieDocumental);

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...especiesDocumentais}
          titulo="Espécies documentais"
          colunas={[
            { nome: "Nome", valor: "nome" },
            { nome: "Área", valor: "nomeAreaDepartamento" },
            {
              nome: "Retenção",
              valor: "retencao",
              formato: (item) => calcularTempo(item),
            },
            {
              nome: "Prazo final",
              valor: "",
              formato: (item) => {
                return dayjs(item?.dataInicioRetencao)
                  .tz("America/Sao_Paulo")
                  .add(item?.retencao, "day")
                  .format("DD/MM/YYYY");
              },
            },
            { nome: "Descrição", valor: "descricao" },
          ]}
          acao={getEspeciesDocumentais}
          exibirFiltro={true}
          exibirBotaoAdicionar={true}
        />
      </div>
    </div>
  );
};

export default EspecieDocumental;
