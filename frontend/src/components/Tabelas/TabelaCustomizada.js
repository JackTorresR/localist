import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import Paginacao, {
  gerarInformacoesPaginacao,
  limiteItemsPorPagina,
} from "./Paginacao";
import CabecalhoTabela from "./CabecalhoTabela";
import CORES from "../../styles/Cores";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { dadoExiste } from "../../utils/utils";
import TooltipAplicavel from "../Tooltip/TooltipAplicavel";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const TabelaCustomizada = (props = {}) => {
  const {
    lista = [],
    pagina = 0,
    acao = null,
    colunas = [],
    quantidade = 0,
    acaoEditar = null,
    acaoRemover = null,
    entidade = "filtro",
    acaoDetalhar = null,
    botoesExtrasAcao = [],
    mostrarAcaoEditar = true,
    mostrarAcaoRemover = true,
    mostrarAcaoDetalhar = true,
  } = props;

  const nomeModalFiltro = `${entidade}-modal-filter`;
  const [itemSelecionado, setItemSelecionado] = useState(null);

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

  const botoesAcao = (item) =>
    [
      {
        titulo: "Detalhar",
        condicional: mostrarAcaoDetalhar,
        acao: () => (acaoDetalhar ? acaoDetalhar(item) : null),
      },
      {
        titulo: "Editar",
        condicional: mostrarAcaoEditar,
        acao: () => (acaoEditar ? acaoEditar(item) : null),
      },
      {
        titulo: "Remover",
        condicional: mostrarAcaoRemover,
        acao: () => (acaoRemover ? acaoRemover(item) : null),
      },
    ]?.concat(botoesExtrasAcao);

  const botaoAcaoLinhaTabela = (props = {}) => {
    const { botao, item, ix } = props;

    const tipoCondicional = botao?.condicional
      ? typeof botao?.condicional
      : null;

    let podeMostrarAcao = true;
    const condicionalFuncao = tipoCondicional === "function";
    if (condicionalFuncao) {
      podeMostrarAcao = botao?.condicional(item);
    }

    const condicionalBooleano = tipoCondicional === "boolean";
    if (condicionalBooleano) {
      podeMostrarAcao = botao?.condicional;
    }

    return (
      podeMostrarAcao && (
        <Button
          sx={{
            flex: 1,
            display: "flex",
            margin: "5px 5px",
            alignItems: "center",
            lineHeight: "normal",
            position: "relative",
            justifyContent: "center",
            borderRadius: "0px 0px 10px 10px",
            backgroundColor: botao?.cor || CORES.CINZA_ESCURO,
            ...botao?.sx,
          }}
          key={`${ix}_botao_acao`}
          onClick={() =>
            botao?.acao ? botao?.acao(item) : toast.error("🚧 em construção!")
          }
        >
          <Typography
            fontSize={18}
            color={CORES.PRETO}
            sx={{ display: "flex", position: "sticky", left: 0 }}
          >
            {botao?.titulo || "Não informado"}
          </Typography>
        </Button>
      )
    );
  };

  const estiloColuna = {
    zIndex: 1,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: CORES.CINZA_PADRAO,
  };

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
              <TableCell key={"botao-cell"} sx={estiloColuna} />
              {colunas?.map((item, index) => (
                <TableCell key={index} sx={estiloColuna}>
                  {item?.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {lista.map((item, index) => {
              const estaSelecionado = itemSelecionado === item?._id;

              return (
                <React.Fragment key={`linha-${index}`}>
                  <TableRow>
                    <TableCell key={index + "-botao"}>
                      <IconButton
                        onClick={() =>
                          setItemSelecionado(estaSelecionado ? null : item?._id)
                        }
                      >
                        {estaSelecionado ? (
                          <MdKeyboardArrowUp />
                        ) : (
                          <MdKeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                    {colunas?.map((coluna, colIndex) => {
                      let dado = item?.[coluna?.value || coluna?.name] || "---";
                      if (coluna?.formatar) {
                        const infoFormatacao = dadoExiste(dado) ? dado : item;
                        dado = coluna?.formatar(infoFormatacao);
                      }

                      const componenteItem = (
                        <TableCell key={`dado-coluna-${colIndex}`}>
                          {dado}
                        </TableCell>
                      );

                      const mostrarTooltip = dado?.length > 100;
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
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={colunas?.length + 1}
                    >
                      <Collapse
                        in={estaSelecionado}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box
                          sx={{
                            mb: 2,
                            display: "flex",
                            overflow: "hidden",
                            border: "1px solid #ccc",
                          }}
                        >
                          {botoesAcao(item)?.map((botao, ix) =>
                            botaoAcaoLinhaTabela({ botao, item, ix })
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Paginacao listaPaginas={listaPaginas} />
    </Box>
  );
};

export default TabelaCustomizada;
