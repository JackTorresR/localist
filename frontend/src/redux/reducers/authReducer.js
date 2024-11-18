import { createSlice } from "@reduxjs/toolkit";

const valoresIniciais = {};

export const auth = createSlice({
  name: "auth",
  initialState: valoresIniciais,
  reducers: {
    ACESSAR: (state, action) => {
      localStorage.setItem("usuario", JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
      };
    },
    ACESSAR_AUTOMATICAMENTE: (state) => {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      return { ...state, ...usuario };
    },
    SAIR: () => {
      localStorage.removeItem("usuario");
      return { ...valoresIniciais };
    },
  },
});

export default auth.reducer;
