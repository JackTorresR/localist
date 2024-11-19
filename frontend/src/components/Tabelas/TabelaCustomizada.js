import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import Paginacao, { gerarInformacoesPaginacao } from "./Paginacao";
import CabecalhoTabela from "./CabecalhoTabela";
import CORES from "../../styles/Cores";
import { useState } from "react";

const TabelaCustomizada = (props = {}) => {
  const [paginaAtual, setPaginaAtual] = useState(props?.pagina || 0);
  const { lista = [], quantidade = 0, colunas = [] } = props;

  const { inicioLista, fimLista, listaPaginas } = gerarInformacoesPaginacao({
    quantidade,
    paginaAtual,
    alterarPagina: (p) => setPaginaAtual(p),
  });

  return (
    <Box sx={{ mt: 4, borderRadius: "8px", boxShadow: 3 }}>
      <CabecalhoTabela {...props} />
      <TableContainer
        sx={{
          maxHeight: "60vh",
          overflow: "auto",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: CORES.CINZA_PADRAO,
            borderRadius: "4px",
            border: "2px solid #fff",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {colunas.map((item, index) => (
                <TableCell
                  key={index}
                  sx={{
                    zIndex: 1,
                    fontSize: 16,
                    fontWeight: "bold",
                    backgroundColor: CORES.CINZA_PADRAO,
                  }}
                >
                  {item?.nome}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {lista?.slice(inicioLista, fimLista).map((item, index) => (
              <TableRow key={`linha-${index}`}>
                {colunas.map((coluna, colIndex) => (
                  <TableCell key={`dado-coluna-${colIndex}`}>
                    {item?.[coluna?.valor || coluna?.nome] || "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paginacao listaPaginas={listaPaginas} />
    </Box>
  );
};

export default TabelaCustomizada;
