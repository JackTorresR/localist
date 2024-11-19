import Store from "../Store";

const reducerName = "areaDepartamento";
const { dispatch } = Store;

export const detalharAreaDepartamento = (dados) => {
  const acaoReducer = "DETALHAR";
  const type = `${reducerName}/${acaoReducer}`;

  const payload = dados;
  dispatch({ type, payload });
};

export const limparAreaDepartamentoDetalhe = () => {
  const acaoReducer = "LIMPAR_DETALHE";
  const type = `${reducerName}/${acaoReducer}`;

  dispatch({ type });
};
