import Store from "../Store";

const reducerName = "caixaArquivo";
const { dispatch } = Store;

export const detalharCaixaArquivo = (dados) => {
  const acaoReducer = "DETALHAR";
  const type = `${reducerName}/${acaoReducer}`;

  const payload = dados;
  dispatch({ type, payload });
};

export const limparCaixaArquivoDetalhe = () => {
  const acaoReducer = "LIMPAR_DETALHE";
  const type = `${reducerName}/${acaoReducer}`;

  dispatch({ type });
};
