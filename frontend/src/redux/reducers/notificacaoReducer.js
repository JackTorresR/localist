import { createSlice } from "@reduxjs/toolkit";
import { reducersPadroes, valoresIniciaisPadroes } from "../base";

const valoresIniciais = valoresIniciaisPadroes;

export const notificacao = createSlice({
  name: "notificacao",
  initialState: valoresIniciais,
  reducers: { ...reducersPadroes() },
});

export default notificacao.reducer;
