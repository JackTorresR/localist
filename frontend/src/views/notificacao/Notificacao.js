import { useSelector } from "react-redux";
import TabelaCustomizada from "../../components/Tabelas/TabelaCustomizada";
import { abrirModal } from "../../redux/acoes/acoesModal";
import Estilos from "../../styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { getNotificacoes } from "../../database/dbCaixaArquivo";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.locale("pt-br");

const Notificacao = () => {
  const notificacoes = useSelector((state) => state?.notificacao);

  return (
    <div style={Estilos.containerPrincipal}>
      <div style={{ flex: 1 }}>
        <TiThMenu
          onClick={() => abrirModal("drawer")}
          size={40}
          style={Estilos.clicavel}
        />
        <TabelaCustomizada
          {...notificacoes}
          titulo="Notificações"
          colunas={[
            { nome: "Ano", valor: "anoDocumentos", alinhar: "center" },
            {
              nome: "Expiração",
              alinhar: "center",
              formato: (item) =>
                dayjs(item?.dataExpiracao)
                  .tz("America/Sao_Paulo")
                  .format("DD/MM/YYYY"),
            },
            { nome: "Espécie", valor: "nomeEspecieDocumental" },
            { nome: "Cliente", valor: "nomeCliente" },
            { nome: "Observações", valor: "observacoes" },
          ]}
          acao={getNotificacoes}
          exibirFiltro={true}
        />
      </div>
    </div>
  );
};

export default Notificacao;
