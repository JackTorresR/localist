import { MdDelete, MdEdit } from "react-icons/md";
import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";
import { dadoExiste, dispatcher } from "../../utils/utils";
import Paginacao, {
  gerarInformacoesPaginacao,
  limiteItemsPorPagina,
} from "../Tabelas/Paginacao";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TabelaCustomizada = (props = {}) => {
  const navigate = useNavigate();
  const listaInicial = props?.lista || [];
  const quantidadeInicial = dadoExiste(props?.quantidade)
    ? props?.quantidade
    : listaInicial?.length;

  const {
    campos = [],
    entidade = "",
    acaoBusca = null,
    acoesExtras = [],
    acaoRemover = null,
    tabelaPadrao = true,
    lista = listaInicial,
    mostrarEditar = true,
    mostrarExcluir = true,
    quantidade = quantidadeInicial,
  } = props;

  const temPaginacao = quantidade > limiteItemsPorPagina;
  const paginaAtual = useSelector((state) => state?.[entidade]?.pagina);

  const parametros = {
    quantidade,
    paginaAtual,
    alterarPagina: (p) => acaoBusca({ offset: p * limiteItemsPorPagina }),
  };
  const informacoesPaginacao = gerarInformacoesPaginacao(parametros);

  const mostrarAcoes =
    campos?.length > 0 &&
    (mostrarEditar === true ||
      mostrarExcluir === true ||
      acoesExtras?.filter((a) => a?.visivel !== false)?.length > 0);

  if (quantidade <= 0) return null;

  const disporDado = (itemLista, itemCampo) => {
    const valorPadrao = "---";
    if (itemCampo?.tipo === "date") {
      return (
        dayjs(itemLista?.[itemCampo?.nomeCampo], "YYYY-MM-DD")?.format(
          "DD/MM/YYYY"
        ) || valorPadrao
      );
    }

    return itemLista?.[itemCampo?.nomeCampo] || valorPadrao;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "80%", paddingTop: 20 }}>
        <div
          style={{
            borderRadius: 15,
            overflow: "hidden",
            height: tabelaPadrao ? (temPaginacao ? "85vh" : "94vh") : "auto",
            backgroundColor: CORES.BRANCO,
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: CORES.AZUL_CLARO }}>
                {campos?.map((item, index) => (
                  <th
                    key={`${index}_campo`}
                    style={{
                      padding: 10,
                      textAlign: item?.alinhamento
                        ? item?.alinhamento
                        : "start",
                      width: `${100 / campos.length}%`,
                    }}
                  >
                    {item?.tituloCampo}
                  </th>
                ))}
                {mostrarAcoes && (
                  <th
                    key="acoes-tabela"
                    style={{ padding: 10, width: "5%" }}
                  ></th>
                )}
              </tr>
            </thead>
          </table>
          <div
            style={{
              maxHeight: "88vh",
              overflowY: "auto",
              boxSizing: "border-box",
              paddingBottom: 10,
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <tbody>
                {lista?.map((itemLista, index) => (
                  <tr
                    key={`${index}_linha`}
                    style={{
                      ...Estilos.bordaLinha,
                      backgroundColor: CORES.BRANCO,
                    }}
                  >
                    {campos?.map((itemCampo, ind) => (
                      <td
                        key={`${ind}_valor_linha`}
                        style={{
                          padding: 10,
                          textAlign: itemCampo?.alinhamento
                            ? itemCampo?.alinhamento
                            : "start",
                          width: `${100 / campos.length}%`,
                        }}
                      >
                        {disporDado(itemLista, itemCampo)}
                      </td>
                    ))}
                    {mostrarAcoes && (
                      <td
                        style={{ padding: 10, textAlign: "end", width: "5%" }}
                      >
                        {mostrarEditar && (
                          <MdEdit
                            size={25}
                            color={CORES.PRETO}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate(itemLista?._id);
                              dispatcher(`${entidade}/DETALHAR`, itemLista);
                            }}
                          />
                        )}
                        {mostrarExcluir && (
                          <MdDelete
                            size={25}
                            color={CORES.PRETO}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              acaoRemover ? acaoRemover(itemLista?._id) : null
                            }
                          />
                        )}
                        {acoesExtras
                          ?.filter((acao) => acao?.visivel === true)
                          ?.map((botaoExtra, index) => {
                            const Icone = botaoExtra?.icone;
                            return (
                              <Icone
                                key={index}
                                {...botaoExtra?.iconeProps}
                                style={{ margin: 2, cursor: "pointer" }}
                                onClick={() =>
                                  botaoExtra?.acao
                                    ? botaoExtra?.acao(itemLista)
                                    : null
                                }
                              />
                            );
                          })}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {temPaginacao && <Paginacao {...informacoesPaginacao} />}
      </div>
    </div>
  );
};

export default TabelaCustomizada;
