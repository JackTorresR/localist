import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";

export const limiteItemsPorPagina = 15;

const Paginacao = (props = {}) => {
  const { listaPaginas = [] } = props;

  const naoMostrarPaginador =
    listaPaginas?.length <= 0 || listaPaginas?.length === 1;
  if (naoMostrarPaginador) {
    return null;
  }

  return (
    <div
      style={{
        padding: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {listaPaginas
        ?.filter((item) => item?.desativar !== true)
        ?.map((item, index) => (
          <button
            key={`${index}_pagina`}
            style={{
              ...Estilos.sombraContainer,
              ...Estilos.containerFlexCentralizado,
              backgroundColor: item?.selecionado
                ? CORES.VERDE_CLARO
                : CORES.BRANCO,
              cursor: "pointer",
              borderRadius: 8,
              padding: 10,
              margin: 5,
              width: 50,
            }}
            onClick={() => (item?.acao ? item?.acao() : null)}
          >
            <span
              style={{
                ...Estilos.textoBotaoVerde,
                color: item?.selecionado ? CORES.BRANCO : CORES.PRETO,
              }}
            >
              {item?.nome?.toString() || "?"}
            </span>
          </button>
        ))}
    </div>
  );
};

export const gerarInformacoesPaginacao = (props = {}) => {
  const { quantidade, paginaAtual, alterarPagina } = props;

  let numerosPaginas = Array.from(
    { length: Math.ceil(quantidade / limiteItemsPorPagina) },
    (v, i) => i + 1
  );

  const listaPaginas = [];

  const primeiraPagina = 0;
  const ultimaPagina =
    quantidade > 0 && Math.ceil(quantidade / limiteItemsPorPagina) - 1;

  const temTresPaginas = quantidade > limiteItemsPorPagina * 2;

  const naoEstaPrimeiraPagina = paginaAtual !== 0;
  const mostrarInicio = temTresPaginas && naoEstaPrimeiraPagina;
  if (mostrarInicio && paginaAtual > 2) {
    listaPaginas.push({
      nome: 1,
      acao: () => alterarPagina(0),
      desativar: primeiraPagina * limiteItemsPorPagina >= quantidade,
    });
  }

  numerosPaginas.map((pageNumber, posicaoPagina) => {
    const podeMostrarPagina =
      posicaoPagina > paginaAtual - 3 && posicaoPagina < paginaAtual + 3;

    const selecionado = (paginaAtual || 0) === posicaoPagina;

    if (podeMostrarPagina) {
      listaPaginas.push({
        selecionado,
        nome: pageNumber,
        acao: () => (selecionado ? null : alterarPagina(posicaoPagina)),
      });
    }
    return pageNumber;
  });

  const mostrarFim = temTresPaginas && paginaAtual !== ultimaPagina;
  if (mostrarFim && paginaAtual < ultimaPagina - 2) {
    listaPaginas.push({
      nome: ultimaPagina + 1,
      acao: () => alterarPagina(ultimaPagina),
      desativar: ultimaPagina * limiteItemsPorPagina >= quantidade,
    });
  }

  const inicioLista = (paginaAtual || 0) * limiteItemsPorPagina;
  const fimLista =
    (paginaAtual || 0) * limiteItemsPorPagina + limiteItemsPorPagina;

  return { inicioLista, fimLista, listaPaginas };
};

export default Paginacao;
