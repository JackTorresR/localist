import { dadoExiste } from "../../utils/utils";
import Store from "../Store";

const reducerName = "modal";
const { dispatch } = Store;

export const abrirModal = (modalName) => {
  const acaoReducer = "ABRIR";
  const type = `${reducerName}/${acaoReducer}`;
  const payload = modalName;
  dispatch({ type, payload });
};

export const fecharModal = (modalName) => {
  const acaoReducer = dadoExiste(modalName) ? "FECHAR" : "FECHAR_TODOS";
  const type = `${reducerName}/${acaoReducer}`;
  const payload = modalName;
  dispatch({ type, payload });
};

export const alternarModal = (modalName) => {
  const acaoReducer = "ALTERNAR";
  const type = `${reducerName}/${acaoReducer}`;
  const payload = modalName;
  dispatch({ type, payload });
};
