import { createSlice } from "@reduxjs/toolkit";
import { reducersPadroes, valoresIniciaisPadroes } from "../base";

const valoresIniciais = valoresIniciaisPadroes;

export const caixaArquivo = createSlice({
  name: "caixaArquivo",
  initialState: valoresIniciais,
  reducers: { ...reducersPadroes() },
});

export default caixaArquivo.reducer;
