import { createSlice } from "@reduxjs/toolkit";
import { reducersPadroes, valoresIniciaisPadroes } from "../base";

const valoresIniciais = valoresIniciaisPadroes;

export const especieDocumental = createSlice({
  name: "especieDocumental",
  initialState: valoresIniciais,
  reducers: { ...reducersPadroes() },
});

export default especieDocumental.reducer;
