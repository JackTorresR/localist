import Store from "../Store";

const reducerName = "especieDocumental";
const { dispatch } = Store;

export const detalharEspecieDocumental = (dados) => {
  const acaoReducer = "DETALHAR";
  const type = `${reducerName}/${acaoReducer}`;

  const payload = dados;
  dispatch({ type, payload });
};

export const limparEspecieDocumentalDetalhe = () => {
  const acaoReducer = "LIMPAR_DETALHE";
  const type = `${reducerName}/${acaoReducer}`;

  dispatch({ type });
};
