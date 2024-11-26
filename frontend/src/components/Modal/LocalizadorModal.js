import {
  Modal,
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { MdCheck } from "react-icons/md"; // Ícone CheckMark
import { abrirModal, fecharModal } from "../../redux/acoes/acoesModal";
import CORES from "../../styles/Cores";
import Estilos from "../../styles/Styles";
import TooltipAplicavel from "../Tooltip/TooltipAplicavel";
import { useEffect } from "react";
import { dadoExiste } from "../../utils/utils";
import Paginacao, {
  gerarInformacoesPaginacao,
  limiteItemsPorPagina,
} from "../Tabelas/Paginacao";
import toast from "react-hot-toast";
import CabecalhoTabela from "../Tabelas/CabecalhoTabela";
import FormModal from "./FormModal";

const LocalizadorModal = (props = {}) => {
  const {
    acao,
    titulo,
    campos = [],
    colunas = [],
    entidade = "",
    acaoSalvar = () => null,
    onRegistroSelecionado = () => null,
  } = props;

  useEffect(() => {
    const fetchData = async () => (acao ? acao() : null);

    fetchData();
  }, [acao]);

  const registros = useSelector((state) => state?.[entidade]);

  const nomeModal = `${entidade}-modal-smartcard`;
  const open = useSelector((state) => state?.modal?.[nomeModal]) || false;

  const temRegistros = registros?.quantidade > 0;

  const handleClose = () => fecharModal(nomeModal);

  const parametrosBusca = useSelector((state) => state?.parametroBusca || {})?.[
    nomeModal
  ];

  const parametrosGerais = (pag) => ({
    ...parametrosBusca,
    offset: pag * limiteItemsPorPagina,
  });

  const infosPaginacao = gerarInformacoesPaginacao(
    {
      quantidade: registros?.quantidade,
      paginaAtual: registros?.pagina,
      alterarPagina: async (pag) =>
        acao
          ? await acao(parametrosGerais(pag))
          : toast.error("Ação não informada!"),
    } || {}
  );

  const { listaPaginas } = infosPaginacao;

  const handleSubmit = (dados) => acaoSalvar && acaoSalvar(dados);

  const propsComponentes = { campos, entidade, itemDetalhe: {} };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={`${nomeModal}-titulo`}
      aria-describedby={`${nomeModal}-descricao`}
      sx={Estilos.containerFlexCentralizado}
    >
      <Card
        style={{
          width: "90%",
          padding: 10,
          overflow: "unset",
          position: "relative",
        }}
      >
        <FormModal {...propsComponentes} onSubmit={handleSubmit} />
        <CabecalhoTabela
          {...registros}
          acao={acao}
          entidade={entidade}
          exibirFiltro={true}
          camposFiltro={campos}
          exibirBotaoAdicionar={true}
          titulo={titulo || "Selecione um registro"}
          onAdd={() => abrirModal(`${entidade}-modal-form`)}
        />
        <Box sx={{ p: 2, border: "1px solid #ccc" }}>
          <TableContainer sx={{ maxHeight: "60vh", overflow: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {colunas?.map((coluna, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: CORES.CINZA_PADRAO,
                      }}
                    >
                      {coluna?.name || " "}
                    </TableCell>
                  ))}
                  {temRegistros && (
                    <TableCell
                      key="acao"
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: CORES.CINZA_PADRAO,
                        textAlign: "center",
                      }}
                    ></TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {temRegistros ? (
                  registros?.lista?.map((item, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {colunas?.map((coluna, colIndex) => {
                        let dado =
                          item?.[coluna?.value || coluna?.name] || "---";
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
                      <TooltipAplicavel titulo="Selecionar">
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            onClick={() => {
                              fecharModal(nomeModal);
                              onRegistroSelecionado(item);
                            }}
                          >
                            <MdCheck size={24} />
                          </IconButton>
                        </TableCell>
                      </TooltipAplicavel>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={colunas?.length + 1} align="center">
                      Nenhum registro encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Paginacao listaPaginas={listaPaginas} />
        </Box>
      </Card>
    </Modal>
  );
};

export default LocalizadorModal;
