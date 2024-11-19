import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/authReducer";
import modal from "./reducers/modalReducer";
import cliente from "./reducers/clienteReducer";
import usuario from "./reducers/usuarioReducer";
import notificacao from "./reducers/notificacaoReducer";
import caixaArquivo from "./reducers/caixaArquivoReducer";
import parametroBusca from "./reducers/parametroBuscaReducer";
import areaDepartamento from "./reducers/areaDepartamentoReducer";
import especieDocumental from "./reducers/especieDocumentalReducer";

const listaReducers = Object.entries({
  auth,
  modal,
  cliente,
  usuario,
  notificacao,
  caixaArquivo,
  parametroBusca,
  areaDepartamento,
  especieDocumental,
})?.sort((a, b) => a[0].localeCompare(b[0]));

const reducer = Object.fromEntries(listaReducers);

const Store = configureStore({ reducer });

export default Store;
