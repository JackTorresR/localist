import {
  dadoExiste,
  dispatcher,
  gerarNomeSemPontuacao,
  normalizarData,
} from "../utils/utils";
import verificarPorErros from "../config/verificarPorErros";
import { limiteItemsPorPagina } from "../components/Tabelas/Paginacao";
import { toast } from "react-hot-toast";
import configs from "../config/config";
import {
  detalharCaixaArquivo,
  limparCaixaArquivoDetalhe,
} from "../redux/acoes/acoesCaixaArquivo";
import Store from "../redux/Store";
import httpRequest from "../utils/httpRequest";
import {
  camposFormCliente,
  colunasTabelaClientes,
  getClientes,
  salvarCliente,
} from "./dbCliente";
import {
  camposFormEspecieDocumental,
  colunasTabelaEspecieDocumental,
  getEspeciesDocumentais,
  salvarEspecieDocumental,
} from "./dbEspecieDocumental";

const prefixo = "caixaArquivo";
const url = "caixa-arquivo";

export const getCaixasArquivo = async (params = {}) => {
  const {
    offset = 0,
    listarNotificacoes = false,
    limite = limiteItemsPorPagina,
    ...outrosParams
  } = params;

  limparCaixaArquivoDetalhe();

  const searchParams = new URLSearchParams({ offset, limit: limite });

  if (listarNotificacoes) {
    searchParams.append("situacao", "Aguardando descarte");
  }

  Object.entries(outrosParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(
      `${configs.API_URL}/caixa-arquivo?${searchParams.toString()}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    if (!response.ok) {
      throw new Error("Erro ao listar caixas de arquivos!");
    }

    const { lista, quantidade } = await response.json();

    const buscouLimitado = dadoExiste(params?.limite) || params?.limite === 0;
    if (buscouLimitado) return lista;

    const pagina = offset / limite;

    const prefixoUtilizado = listarNotificacoes ? "notificacao" : prefixo;
    dispatcher(`${prefixoUtilizado}/LISTAR`, { lista, pagina, quantidade });

    const filtrouAchouSoUm =
      Object.keys(outrosParams)?.length > 0 && quantidade === 1;

    if (filtrouAchouSoUm) {
      detalharCaixaArquivo(lista?.[0]);
    }
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const getNotificacoes = async (params = {}) =>
  getCaixasArquivo({ ...params, listarNotificacoes: true });

export const getCaixaArquivo = async (id) => {
  try {
    const resposta = await fetch(`${configs.API_URL}/${url}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.mensagem || "Erro ao buscar caixa de arquivo!");
    }

    detalharCaixaArquivo(resultado?.caixaArquivo);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const salvarCaixaArquivo = async (dados = {}) => {
  try {
    const caixaArquivo = {
      ...dados,
      nomeSemPontuacao: gerarNomeSemPontuacao(dados?.nome),
    };

    if (dadoExiste(caixaArquivo?._id)) {
      await editarCaixaArquivo(caixaArquivo);
      return null;
    }

    await criarCaixaArquivo(caixaArquivo);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const editarCaixaArquivo = async (caixaArquivo) => {
  try {
    const urlCompleta = `${configs.API_URL}/${url}/${caixaArquivo._id}`;
    const response = await fetch(urlCompleta, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(caixaArquivo),
    });

    if (!response.ok) {
      throw new Error("Erro ao editar caixa de arquivo!");
    }

    const { mensagem } = await response.json();

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getCaixasArquivo(parametrosBusca);

    toast.success(mensagem);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const criarCaixaArquivo = async (caixaArquivo) => {
  try {
    const urlCompleta = `${configs.API_URL}/${url}`;
    const response = await fetch(urlCompleta, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(caixaArquivo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.mensagem);
    }

    const data = await response.json();

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getCaixasArquivo(parametrosBusca);

    toast.success(data.mensagem);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const removerCaixaArquivo = async (id) => {
  if (!dadoExiste(id)) {
    toast.error("Não conseguimos identificar a caixa de arquivo!");
    return null;
  }

  try {
    const resposta = await fetch(`${configs.API_URL}/${url}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      toast.error(resultado.mensagem || "Erro ao remover caixa de arquivo!");
      return;
    }

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getCaixasArquivo(parametrosBusca);

    toast.success(
      resultado.mensagem || "Caixa de arquivo removida com sucesso!"
    );
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const informarDescarteCaixaArquivo = async (id) => {
  try {
    const resposta =
      (await httpRequest({
        url: `${url}/${id}/descartar`,
        method: "PUT",
      })) || {};

    const { mensagem } = resposta;

    toast.success(mensagem);

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getNotificacoes(parametrosBusca);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const colunasTabelaCaixaArquivo = [
  { name: "Ano", value: "anoDocumentos", alinhar: "center" },
  {
    name: "Expiração",
    alinhar: "center",
    formatar: (item) => normalizarData(item?.dataExpiracao),
  },
  { name: "Espécie", value: "nomeEspecieDocumental" },
  { name: "Cliente", value: "nomeCliente" },
  { name: "Situação", value: "situacao" },
  { name: "Observações", value: "observacoes" },
];

export const camposFormCaixaArquivo = [
  {
    tamanhoGrid: { md: 6 },
    label: "Identificador",
    name: "identificador",
    obrigatorio: true,
  },
  {
    tamanhoGrid: { md: 6 },
    label: "Ano dos documentos",
    name: "anoDocumentos",
    obrigatorio: true,
  },
  {
    tamanhoGrid: { md: 12 },
    label: "Localização",
    name: "localizacao",
    obrigatorio: true,
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
    tamanhoGrid: { md: 12 },
    label: "Espécie documental",
    name: "nomeEspecieDocumental",
    componente: {
      acao: getEspeciesDocumentais,
      entidade: "especieDocumental",
      campoId: "idEspecieDocumental",
      acaoSalvar: salvarEspecieDocumental,
      campos: camposFormEspecieDocumental,
      colunas: colunasTabelaEspecieDocumental,
    },
  },
  {
    tamanhoGrid: { md: 6 },
    label: "Data armazenamento",
    name: "dataArmazenamento",
    tipo: "date",
    obrigatorio: true,
    formatar: (item) => normalizarData(item?.dataArmazenamento),
  },
  {
    tamanhoGrid: { md: 6 },
    label: "Data expiração",
    name: "dataExpiracao",
    tipo: "date",
    obrigatorio: true,
    formatar: (item) => normalizarData(item?.dataExpiracao),
  },
  {
    tamanhoGrid: { md: 12 },
    label: "Situação",
    name: "situacao",
    tipo: "select",
    obrigatorio: true,
    selectItems: [
      { label: "Em Prazo", value: "Em Prazo" },
      { label: "Aguardando descarte", value: "Aguardando descarte" },
      { label: "Descartado", value: "Descartado" },
    ],
  },
  {
    tamanhoGrid: { md: 12 },
    label: "Observações",
    name: "observacoes",
    rows: 3,
    filtravel: false,
  },
];
