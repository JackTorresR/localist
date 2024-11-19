import { createSlice } from "@reduxjs/toolkit";
import { reducersPadroes, valoresIniciaisPadroes } from "../base";

const valoresIniciais = valoresIniciaisPadroes;

export const usuario = createSlice({
  name: "usuario",
  initialState: valoresIniciais,
  reducers: { ...reducersPadroes() },
});

export default usuario.reducer;
