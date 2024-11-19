import { createSlice } from "@reduxjs/toolkit";
import { reducersPadroes, valoresIniciaisPadroes } from "../base";

const valoresIniciais = valoresIniciaisPadroes;

export const areaDepartamento = createSlice({
  name: "areaDepartamento",
  initialState: valoresIniciais,
  reducers: { ...reducersPadroes() },
});

export default areaDepartamento.reducer;
