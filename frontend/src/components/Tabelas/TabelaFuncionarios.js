import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Box,
  Typography,
  Button,
  Icon,
  TablePagination,
} from "@mui/material";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import CORES from "../../styles/Cores";
import {
  detalharFuncionario,
  limparFuncionarioDetalhe,
} from "../../redux/acoes/acoesFuncionario";
import { useSelector } from "react-redux";
import { normalizarCPF } from "../../utils/utils";
import { getFuncionarios } from "../../database/dbFuncionario";
import { limiteItemsPorPagina } from "../Tabelas/Paginacao";
import React from "react";
import TabelaToolbar from "./TabelaToolbar";
import BOTOES_ACAO_FUNCIONARIO from "../../data/botoesAcaoFuncionario";
import { useNavigate } from "react-router-dom";

const TabelaFuncionarios = () => {
  const navigate = useNavigate();

  const funcionarioSelecionado = useSelector(
    (state) => state?.funcionario?.detalhe
  );
  const funcionarios = useSelector((state) => state?.funcionario?.lista || []);
  const pagina = useSelector((state) => state?.funcionario?.pagina || 0);
  const quantidade = useSelector(
    (state) => state?.funcionario?.quantidade || 0
  );

  const camposFiltro = [
    {
      label: "Nome",
      name: "nomeSemPontuacao",
      tipo: "text",
    },
    {
      label: "Email",
      name: "email",
      tipo: "email",
    },
    {
      label: "É administrador?",
      name: "eAdministrador",
      tipo: "select",
      selectItems: [
        { label: "Sim", value: "SIM" },
        { label: "Não", value: "NAO" },
      ],
      tamanhoGrid: { md: 6 },
    },
    {
      label: "Data de Contratação",
      name: "dataContratacao",
      tipo: "date",
      tamanhoGrid: { md: 6 },
    },
    {
      label: "CPF",
      name: "cpf",
      tipo: "text",
      mask: "cpf",
      tamanhoGrid: { md: 6 },
    },
    {
      label: "Matrícula",
      name: "matricula",
      tipo: "text",
      tamanhoGrid: { md: 6 },
    },
    {
      label: "Função",
      name: "funcao",
      tipo: "text",
      tamanhoGrid: { md: 6 },
    },
    {
      label: "Município",
      name: "municipio",
      tipo: "select",
      selectItems: [{ label: "municipio1", value: "value1" }],
      tamanhoGrid: { md: 6 },
    },
    {
      label: "Secretaria",
      name: "secretaria",
      tipo: "text",
      tamanhoGrid: { md: 6 },
    },
    {
      label: "Órgão",
      name: "orgao",
      tipo: "text",
      tamanhoGrid: { md: 6 },
    },
  ];

  const mostrarDetalhes = (funcionario) => {
    const estaSelecionado = funcionario?._id === funcionarioSelecionado?._id;
    if (estaSelecionado) {
      limparFuncionarioDetalhe();
      return null;
    }

    detalharFuncionario(funcionario);
  };

  const handleSearchEntity = (dados) => getFuncionarios(dados);

  const estiloTituloColuna = {
    color: CORES.BRANCO,
    fontWeight: "bold",
    fontSize: 20,
  };

  const estiloLinha = { fontSize: 18 };

  const botaoAcaoLinhaTabela = ({ botao, funcionario, ix }) => {
    return (
      <Button
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: "normal",
          backgroundColor: botao.cor,
          borderRadius: 0,
          position: "relative",
          ...botao?.sx,
        }}
        key={`${ix}_botao_acao_detalhe`}
        onClick={() => botao.acao(funcionario)}
      >
        <Icon sx={{ fontSize: 30, marginRight: 1, color: CORES.BRANCO }}>
          {botao.icone}
        </Icon>
        <Typography
          fontSize={30}
          color={CORES.BRANCO}
          sx={{ display: "flex", position: "sticky", left: 0 }}
        >
          {botao.label}
        </Typography>
      </Button>
    );
  };

  return (
    <Box
      component={TableContainer}
      sx={{
        mt: 10,
        mr: 1,
        borderRadius: "8px",
        boxShadow: 3,
      }}
      overflow="auto"
    >
      <TabelaToolbar
        title={"Funcionários"}
        searchModalName="filtro-funcionarios"
        searchFields={camposFiltro}
        onApplyFilter={handleSearchEntity}
      />
      <Table>
        <TableHead
          style={{
            background: CORES.BACKGROUND_GRADIENT,
            borderRadius: 25,
          }}
        >
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography style={estiloTituloColuna}>Nome</Typography>
            </TableCell>
            <TableCell>
              <Typography style={estiloTituloColuna}>Email</Typography>
            </TableCell>
            <TableCell>
              <Typography style={estiloTituloColuna}>Matrícula</Typography>
            </TableCell>
            <TableCell>
              <Typography style={estiloTituloColuna}>Função</Typography>
            </TableCell>
            <TableCell>
              <Typography style={estiloTituloColuna}>CPF</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {funcionarios?.map((funcionario, index) => {
            const estaSelecionado =
              funcionarioSelecionado?._id === funcionario?._id;

            return (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    <IconButton onClick={() => mostrarDetalhes(funcionario)}>
                      {estaSelecionado ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Typography style={estiloLinha}>
                      {funcionario.nome}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={estiloLinha}>
                      {funcionario.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={estiloLinha}>
                      {funcionario.matricula}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={estiloLinha}>
                      {funcionario.funcao}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={estiloLinha}>
                      {normalizarCPF(funcionario.cpf)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={estaSelecionado} timeout="auto" unmountOnExit>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          border: "1px solid #ccc",
                          mb: 2,
                          borderBottomLeftRadius: "6px",
                          borderBottomRightRadius: "6px",
                          overflow: "hidden",
                        }}
                      >
                        {BOTOES_ACAO_FUNCIONARIO(navigate)?.map((botao, ix) =>
                          botaoAcaoLinhaTabela({ botao, funcionario, ix })
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
      <TablePagination
        count={quantidade}
        page={pagina}
        component="div"
        rowsPerPage={limiteItemsPorPagina}
        onPageChange={(event, pagina) =>
          getFuncionarios({ offset: pagina * limiteItemsPorPagina })
        }
        rowsPerPageOptions={[]}
        variant="outlined"
        shape="rounded"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default TabelaFuncionarios;
