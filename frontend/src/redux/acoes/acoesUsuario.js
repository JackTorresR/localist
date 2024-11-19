import Store from "../Store";

const reducerName = "usuario";
const { dispatch } = Store;

export const detalharUsuario = (dados) => {
  const acaoReducer = "DETALHAR";
  const type = `${reducerName}/${acaoReducer}`;

  const payload = dados;
  dispatch({ type, payload });
};

export const limparUsuarioDetalhe = () => {
  const acaoReducer = "LIMPAR_DETALHE";
  const type = `${reducerName}/${acaoReducer}`;

  dispatch({ type });
};
