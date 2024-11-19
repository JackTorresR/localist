import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import Paginacao, {
  gerarInformacoesPaginacao,
  limiteItemsPorPagina,
} from "./Paginacao";
import CabecalhoTabela from "./CabecalhoTabela";
import CORES from "../../styles/Cores";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect } from "react";

const TabelaCustomizada = (props = {}) => {
  const {
    lista = [],
    pagina = 0,
    acao = null,
    colunas = [],
    quantidade = 0,
    entidade = null,
  } = props;

  useEffect(() => {
    const fetchData = async () => (acao ? acao() : null);

    fetchData();
  }, [acao]);

  const parametrosBusca = useSelector(
    (state) => state?.parametroBusca?.[entidade] || {}
  );

  const infosPaginacao = gerarInformacoesPaginacao(
    {
      quantidade,
      paginaAtual: pagina,
      alterarPagina: (pag) =>
        acao
          ? acao({ ...parametrosBusca, offset: pag * limiteItemsPorPagina })
          : toast.error("Ação não informada!"),
    } || {}
  );

  const { listaPaginas } = infosPaginacao;

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
            {lista.map((item, index) => (
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
