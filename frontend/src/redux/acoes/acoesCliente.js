import Store from "../Store";

const reducerName = "cliente";
const { dispatch } = Store;

export const detalharCliente = (dados) => {
  const acaoReducer = "DETALHAR";
  const type = `${reducerName}/${acaoReducer}`;

  const payload = dados;
  dispatch({ type, payload });
};

export const limparClienteDetalhe = () => {
  const acaoReducer = "LIMPAR_DETALHE";
  const type = `${reducerName}/${acaoReducer}`;

  dispatch({ type });
};
