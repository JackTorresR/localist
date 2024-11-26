import {
  calcularTempo,
  dadoExiste,
  dispatcher,
  gerarNomeSemPontuacao
} from "../utils/utils";
import verificarPorErros from "../config/verificarPorErros";
import { limiteItemsPorPagina } from "../components/Tabelas/Paginacao";
import { toast } from "react-hot-toast";
import {
  detalharEspecieDocumental,
  limparEspecieDocumentalDetalhe
} from "../redux/acoes/acoesEspecieDocumental";
import Store from "../redux/Store";
import {
  camposFormAreaDepartamento,
  colunasTabelaAreaDepartamento,
  getAreasDepartamentos,
  salvarAreaDepartamento
} from "./dbAreaDepartamento";
import httpRequest from "../utils/httpRequest";

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
      detalharEspecieDocumental(lista?.[0]);
    }
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
    const resposta = await httpRequest({
      url: `${url}/${especieDocumental._id}`,
      method: "PATCH",
      body: especieDocumental,
    });

    const { mensagem } = resposta;
    toast.success(mensagem);

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getEspeciesDocumentais(parametrosBusca);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const criarEspecieDocumental = async (especieDocumental) => {
  try {
    const resposta = await httpRequest({
      url: `${url}`,
      method: "POST",
      body: especieDocumental,
    });

    const { mensagem } = resposta;
    toast.success(mensagem);

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getEspeciesDocumentais(parametrosBusca);
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
    const resposta = await httpRequest({
      url: `${url}/${id}`,
      method: "DELETE",
    });

    const { mensagem } = resposta;

    toast.success(mensagem || "Espécie documental removida com sucesso!");

    await getEspeciesDocumentais();
    limparEspecieDocumentalDetalhe();
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const colunasTabelaEspecieDocumental = [
  { name: "Nome", value: "nome" },
  { name: "Área", value: "nomeAreaDepartamento" },
  {
    name: "Retenção",
    formatar: (item) => calcularTempo(item),
  },
  { name: "Descrição", value: "descricao" },
];

export const camposFormEspecieDocumental = [
  {
    tamanhoGrid: { md: 12 },
    label: "Nome",
    name: "nome",
    filtravel: false,
  },
  {
    tamanhoGrid: { md: 12 },
    label: "Nome sem pontuação",
    name: "nomeSemPontuacao",
    mostrarFormulario: false,
  },
  {
    tamanhoGrid: { md: 12 },
    label: "Área/Departamento",
    name: "nomeAreaDepartamento",
    componente: {
      acao: getAreasDepartamentos,
      entidade: "areaDepartamento",
      campoId: "idAreaDepartamento",
      acaoSalvar: salvarAreaDepartamento,
      campos: camposFormAreaDepartamento,
      colunas: colunasTabelaAreaDepartamento,
    },
  },
  {
    tamanhoGrid: { md: 6 },
    label: "Retenção",
    name: "retencao",
    formatar: (item) =>
      calcularTempo({
        retencao: item?.retencao,
        tipoRetencao: item?.tipoRetencao,
      }),
  },
  {
    tamanhoGrid: { md: 6 },
    label: "Tipo retenção",
    name: "tipoRetencao",
    tipo: "select",
    selectItems: [
      { label: "Dia", value: "Dia" },
      { label: "Mês", value: "Mês" },
      { label: "Ano", value: "Ano" },
    ],
  },
  {
    tamanhoGrid: { md: 12 },
    label: "Categoria",
    name: "categoria",
    tipo: "select",
    selectItems: [
      { label: "Pessoal", value: "Pessoal" },
      { label: "Empresarial", value: "Empresarial" },
      { label: "Fiscal", value: "Fiscal" },
      { label: "Outros", value: "Outros" },
    ],
  },
  {
    tamanhoGrid: { md: 12 },
    label: "Descrição",
    name: "descricao",
    rows: 3,
    filtravel: false,
  },
];
