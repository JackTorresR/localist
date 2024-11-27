import { dadoExiste, dispatcher, gerarNomeSemPontuacao } from "../utils/utils";
import verificarPorErros from "../config/verificarPorErros";
import { limiteItemsPorPagina } from "../components/Tabelas/Paginacao";
import { toast } from "react-hot-toast";
import {
  detalharAreaDepartamento,
  limparAreaDepartamentoDetalhe
} from "../redux/acoes/acoesAreaDepartamento";
import Store from "../redux/Store";
import {
  camposFormCliente,
  colunasTabelaClientes,
  getClientes,
  salvarCliente
} from "./dbCliente";
import httpRequest from "../utils/httpRequest";

const url = "area-departamento";
const prefixo = "areaDepartamento";

export const getAreasDepartamentos = async (params = {}) => {
  const { offset = 0, limite = limiteItemsPorPagina, ...outrosParams } = params;

  limparAreaDepartamentoDetalhe();

  const searchParams = new URLSearchParams({ offset, limit: limite });

  Object.entries(outrosParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });

  try {
    const resposta = await httpRequest({
      url: `${url}?${searchParams.toString()}`,
      method: "GET",
    });

    const { lista, quantidade } = resposta;

    const buscouLimitado = dadoExiste(params?.limite) || params?.limite === 0;
    if (buscouLimitado) return lista;

    const pagina = offset / limite;

    dispatcher(`${prefixo}/LISTAR`, { lista, pagina, quantidade });

    const filtrouAchouSoUm =
      Object.keys(outrosParams)?.length > 0 && quantidade === 1;

    if (filtrouAchouSoUm) {
      detalharAreaDepartamento(lista?.[0]);
    }
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const salvarAreaDepartamento = async (dados = {}) => {
  try {
    const areaDepartamento = {
      ...dados,
      nomeSemPontuacao: gerarNomeSemPontuacao(dados?.nome),
    };

    if (dadoExiste(areaDepartamento?._id)) {
      await editarAreaDepartamento(areaDepartamento);
      return null;
    }

    await criarAreaDepartamento(areaDepartamento);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const editarAreaDepartamento = async (areaDepartamento) => {
  try {
    const resposta = await httpRequest({
      url: `${url}/${areaDepartamento._id}`,
      method: "PATCH",
      body: areaDepartamento,
    });

    const { mensagem } = resposta;
    toast.success(mensagem);

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getAreasDepartamentos(parametrosBusca);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const criarAreaDepartamento = async (areaDepartamento) => {
  try {
    const resposta = await httpRequest({
      url: `${url}`,
      method: "POST",
      body: areaDepartamento,
    });

    const { mensagem } = resposta;
    toast.success(mensagem);

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getAreasDepartamentos(parametrosBusca);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const removerAreaDepartamento = async (id) => {
  if (!dadoExiste(id)) {
    toast.error("Não conseguimos identificar a área/departamento!");
    return null;
  }

  try {
    const resposta = await httpRequest({
      url: `${url}/${id}`,
      method: "DELETE",
    });

    const { mensagem } = resposta;

    toast.success(mensagem || "Área/Departamento removido com sucesso!");

    await getAreasDepartamentos();
    limparAreaDepartamentoDetalhe();
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const colunasTabelaAreaDepartamento = [
  { name: "Código", value: "codigoArea" },
  { name: "Tipo", value: "tipo" },
  { name: "Nome", value: "nome" },
  { name: "Cliente", value: "nomeCliente" },
  { name: "Descrição", value: "descricao" },
];

export const camposFormAreaDepartamento = [
  {
    tamanhoGrid: { md: 9 },
    label: "Nome",
    name: "nomeSemPontuacao",
  },
  {
    tamanhoGrid: { md: 3 },
    label: "Sigla",
    name: "sigla",
  },
  {
    tamanhoGrid: { md: 12 },
    label: "Responsável",
    name: "responsavel",
  },
  {
    tamanhoGrid: { md: 12 },
    label: "Cliente",
    name: "nomeCliente",
    componente: {
      acao: getClientes,
      entidade: "cliente",
      campoId: "idCliente",
      acaoSalvar: salvarCliente,
      campos: camposFormCliente,
      colunas: colunasTabelaClientes,
    },
  },
  {
    tamanhoGrid: { md: 6 },
    label: "Código da área",
    name: "codigoArea",
  },
  {
    tamanhoGrid: { md: 6 },
    label: "Tipo",
    name: "tipo",
    tipo: "select",
    selectItems: [
      { label: "Área", value: "Área" },
      { label: "Departamento", value: "Departamento" },
    ],
  },
];
