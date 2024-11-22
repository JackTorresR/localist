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
import { dadoExiste } from "../../utils/utils";
import TooltipAplicavel from "../Tooltip/TooltipAplicavel";

const TabelaCustomizada = (props = {}) => {
  const {
    lista = [],
    pagina = 0,
    acao = null,
    colunas = [],
    quantidade = 0,
    nomeModalFiltro = "filtro-modal-form",
  } = props;

  useEffect(() => {
    const fetchData = async () => (acao ? acao() : null);

    fetchData();
  }, [acao]);

  const parametrosBusca = useSelector(
    (state) => state?.parametroBusca?.[nomeModalFiltro] || {}
  );

  const parametrosGerais = (pag) => ({
    ...parametrosBusca,
    offset: pag * limiteItemsPorPagina,
  });

  const infosPaginacao = gerarInformacoesPaginacao(
    {
      quantidade,
      paginaAtual: pagina,
      alterarPagina: async (pag) =>
        acao
          ? await acao(parametrosGerais(pag))
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
                {colunas.map((coluna, colIndex) => {
                  let dado = item?.[coluna?.valor || coluna?.nome] || "---";
                  if (coluna?.formato) {
                    const infoFormatacao = dadoExiste(dado) ? dado : item;
                    dado = coluna?.formato(infoFormatacao);
                  }

                  const componenteItem = (
                    <TableCell key={`dado-coluna-${colIndex}`}>
                      {dado}
                    </TableCell>
                  );

                  const mostrarTooltip =
                    dado?.length > 100 || !dadoExiste(dado);

                  const texto = dadoExiste(dado) ? dado : "Não informado";
                  if (mostrarTooltip) {
                    return (
                      <TooltipAplicavel
                        key={`dado-coluna-tooltip-${colIndex}`}
                        titulo={texto?.substring(0, 300)}
                      >
                        {componenteItem}
                      </TooltipAplicavel>
                    );
                  }

                  return componenteItem;
                })}
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
