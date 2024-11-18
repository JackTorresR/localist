import { createSlice } from "@reduxjs/toolkit";

const valoresIniciais = {};

export const modal = createSlice({
  name: "modal",
  initialState: valoresIniciais,
  reducers: {
    ABRIR: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    FECHAR: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
    FECHAR_TODOS: () => ({ ...valoresIniciais }),
    ALTERNAR: (state, action) => ({
      ...state,
      [action.payload]: !state?.[action.payload],
    }),
  },
});

export default modal.reducer;
