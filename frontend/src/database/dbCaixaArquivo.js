import { dadoExiste, dispatcher, gerarNomeSemPontuacao } from "../utils/utils";
import verificarPorErros from "../config/verificarPorErros";
import { limiteItemsPorPagina } from "../components/Tabelas/Paginacao";
import { toast } from "react-hot-toast";
import configs from "../config/config";
import {
  detalharCaixaArquivo,
  limparCaixaArquivoDetalhe,
} from "../redux/acoes/acoesCaixaArquivo";
import Store from "../redux/Store";

const prefixo = "caixaArquivo";

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
    const resposta = await fetch(`${configs.API_URL}/caixa-arquivo/${id}`, {
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
    const url = `${configs.API_URL}/caixa-arquivo/${caixaArquivo._id}`;
    const response = await fetch(url, {
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
    const url = `${configs.API_URL}/caixa-arquivo`;
    const response = await fetch(url, {
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
    const resposta = await fetch(`${configs.API_URL}/caixa-arquivo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      toast.error(resultado.mensagem || "Erro ao remover caixa de arquivo!");
      return;
    }

    await getCaixasArquivo();
    limparCaixaArquivoDetalhe();

    toast.success(
      resultado.mensagem || "Caixa de arquivo removida com sucesso!"
    );
  } catch (erro) {
    verificarPorErros(erro);
  }
};
