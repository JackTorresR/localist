import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/authReducer";
import modal from "./reducers/modalReducer";
import cliente from "./reducers/clienteReducer";
import parametroBusca from "./reducers/parametroBuscaReducer";

const listaReducers = Object.entries({
  auth,
  modal,
  cliente,
  parametroBusca,
})?.sort((a, b) => a[0].localeCompare(b[0]));

const reducer = Object.fromEntries(listaReducers);

const Store = configureStore({ reducer });

export default Store;
