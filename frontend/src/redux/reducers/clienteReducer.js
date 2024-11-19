import { createSlice } from "@reduxjs/toolkit";
import { reducersPadroes, valoresIniciaisPadroes } from "../base";

const valoresIniciais = valoresIniciaisPadroes;

export const cliente = createSlice({
  name: "cliente",
  initialState: valoresIniciais,
  reducers: { ...reducersPadroes() },
});

export default cliente.reducer;
