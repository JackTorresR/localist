import Store from "../Store";

const reducerName = "parametroBusca";
const { dispatch } = Store;

export const atualizarParametrosBusca = (componente, parametros) => {
  const acaoReducer = "ATRIBUIR";
  const type = `${reducerName}/${acaoReducer}`;

  const payload = { [componente]: parametros };
  dispatch({ type, payload });
};

export const limparParametroFiltro = (componente) => {
  const acaoReducer = "LIMPAR_PARAMETRO";
  const type = `${reducerName}/${acaoReducer}`;

  dispatch({ type, payload: componente });
};
