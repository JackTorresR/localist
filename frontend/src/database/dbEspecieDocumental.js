import { dadoExiste, dispatcher, gerarNomeSemPontuacao } from "../utils/utils";
import verificarPorErros from "../config/verificarPorErros";
import { limiteItemsPorPagina } from "../components/Tabelas/Paginacao";
import { toast } from "react-hot-toast";
import configs from "../config/config";
import {
  detalharEspecieDocumental,
  limparEspecieDocumentalDetalhe,
} from "../redux/acoes/acoesEspecieDocumental";
import Store from "../redux/Store";

const prefixo = "especieDocumental";
const url = "especie-documental";

export const getEspeciesDocumentais = async (params = {}) => {
  const { offset = 0, limite = limiteItemsPorPagina, ...outrosParams } = params;

  limparEspecieDocumentalDetalhe();

  const searchParams = new URLSearchParams({ offset, limit: limite });

  Object.entries(outrosParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(
      `${configs.API_URL}/${url}?${searchParams.toString()}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    if (!response.ok) {
      throw new Error("Erro ao listar espécies documentais!");
    }

    const { lista, quantidade } = await response.json();

    const buscouLimitado = dadoExiste(params?.limite) || params?.limite === 0;
    if (buscouLimitado) return lista;

    const pagina = offset / limite;

    dispatcher(`${prefixo}/LISTAR`, { lista, pagina, quantidade });

    const filtrouAchouSoUm =
      Object.keys(outrosParams)?.length > 0 && quantidade === 1;

    if (filtrouAchouSoUm) {
      detalharEspecieDocumental(lista?.[0]);
    }
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const getEspecieDocumental = async (id) => {
  try {
    const resposta = await fetch(`${configs.API_URL}/${url}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(
        resultado.mensagem || "Erro ao buscar espécie documental!"
      );
    }

    detalharEspecieDocumental(resultado?.especieDocumental);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const salvarEspecieDocumental = async (dados = {}) => {
  try {
    const especieDocumental = {
      ...dados,
      nomeSemPontuacao: gerarNomeSemPontuacao(dados?.nome),
    };

    if (dadoExiste(especieDocumental?._id)) {
      await editarEspecieDocumental(especieDocumental);
      return null;
    }

    await criarEspecieDocumental(especieDocumental);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const editarEspecieDocumental = async (especieDocumental) => {
  try {
    const urlCompleta = `${configs.API_URL}/${url}/${especieDocumental?._id}`;
    const response = await fetch(urlCompleta, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(especieDocumental),
    });

    if (!response.ok) {
      throw new Error("Erro ao editar espécie documental!");
    }

    const { mensagem } = await response.json();

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getEspeciesDocumentais(parametrosBusca);

    toast.success(mensagem);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const criarEspecieDocumental = async (especieDocumental) => {
  try {
    const urlCompleta = `${configs.API_URL}/${url}`;
    const response = await fetch(urlCompleta, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(especieDocumental),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.mensagem);
    }

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getEspeciesDocumentais(parametrosBusca);

    const data = await response.json();
    toast.success(data.mensagem);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const removerEspecieDocumental = async (id) => {
  if (!dadoExiste(id)) {
    toast.error("Não conseguimos identificar a espécie documental!");
    return null;
  }

  try {
    const resposta = await fetch(`${configs.API_URL}/${url}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      toast.error(resultado.mensagem || "Erro ao remover espécie documental!");
      return;
    }

    await getEspeciesDocumentais();
    limparEspecieDocumentalDetalhe();

    toast.success(
      resultado.mensagem || "Espécie Documental removida com sucesso!"
    );
  } catch (erro) {
    verificarPorErros(erro);
  }
};
