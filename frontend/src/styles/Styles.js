import CORES from "./Cores";

const containerFlexCentralizado = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const sombraContainer = { boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" };
const bordaLinha = { borderBottom: `2px solid ${CORES.PRETO}` };
const estiloLinhaLinha = { display: "flex", flexDirection: "column" };

const textoNegrito = { fontWeight: "bold" };
const sombraTexto = {
  textShadow: `
  1px 1px 0 #000000,
  1px 1px 2px rgba(0, 0, 0, 1)
`,
};

const Estilos = {
  containerPrincipal: {
    margin: 40,
    padding: 10,
    height: "80vh",
    display: "flex",
    borderRadius: 5,
    backgroundColor: CORES.BRANCO,
  },
  containerModal: {
    ...containerFlexCentralizado,
    ...sombraContainer,
    padding: 10,
    width: "45vw",
    margin: "auto",
    height: "80vh",
    borderRadius: 5,
    backgroundColor: CORES.BRANCO,
  },
  containerCamera: {
    ...containerFlexCentralizado,
    ...sombraContainer,
    borderRadius: 15,
  },
  containerCampoTexto: {
    ...bordaLinha,
    display: "flex",
    alignItems: "center",
  },
  containerInput: {
    flex: 1,
    padding: 8,
    fontSize: 20,
    border: "none",
    outline: "none",
  },
  containerAbaGerenciamento: {
    ...sombraContainer,
    flex: 2,
    padding: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderBottomRightRadius: 90,
    justifyContent: "flex-start",
    backgroundColor: CORES.CINZA_PADRAO,
  },
  containerLadoLado: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  botaoVerCampo: {
    padding: 0,
    marginLeft: 8,
    marginRight: 8,
    border: "none",
    display: "flex",
    cursor: "pointer",
    background: "none",
    alignItems: "center",
  },
  botaoHorizontalMedioVerde: {
    ...containerFlexCentralizado,
    ...sombraContainer,
    margin: 15,
    padding: 10,
    borderRadius: 8,
    cursor: "pointer",
    backgroundColor: CORES.VERDE_CLARO,
  },
  botaoGrandeVerde: {
    ...containerFlexCentralizado,
    ...estiloLinhaLinha,
    ...sombraContainer,
    width: 200,
    padding: 15,
    borderRadius: 8,
    cursor: "pointer",
    backgroundColor: CORES.VERDE_CLARO,
  },
  botaoPrincipal: {
    ...containerFlexCentralizado,
    ...sombraContainer,
    padding: 15,
    borderRadius: 5,
    paddingLeft: 25,
    paddingRight: 25,
    cursor: "pointer",
    backgroundColor: CORES.VERDE_ESCURO,
    color: CORES.PRETO,
  },
  tituloCampoTexto: { display: "block", fontSize: 16, marginBottom: 8 },
  textoBotaoVerde: {
    ...sombraTexto,
    fontSize: 24,
    fontWeight: "bold",
    color: CORES.BRANCO,
  },
  textoTabela: {
    width: 150,
    padding: 8,
    fontSize: 24,
    textAlign: "center",
    border: `1px solid ${CORES.CINZA_PADRAO}`,
  },
  bordaLinha,
  sombraTexto,
  textoNegrito,
  sombraContainer,
  estiloLinhaLinha,
  containerFlexCentralizado,
};

export default Estilos;
