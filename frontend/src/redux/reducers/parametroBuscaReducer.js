import { createSlice } from "@reduxjs/toolkit";

const valoresIniciais = {};

export const parametroBusca = createSlice({
  name: "parametroBusca",
  initialState: valoresIniciais,
  reducers: {
    ATRIBUIR: (state, action) => ({ ...state, ...action.payload }),
    LIMPAR_PARAMETRO: (state, action) => ({ ...state, [action.payload]: {} }),
  },
});

export default parametroBusca.reducer;
