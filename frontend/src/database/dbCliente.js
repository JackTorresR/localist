import {
  dadoExiste,
  dispatcher,
  gerarNomeSemPontuacao,
  normalizarData,
  normalizarDocumento,
  normalizarTelefone,
} from "../utils/utils";
import verificarPorErros from "../config/verificarPorErros";
import { limiteItemsPorPagina } from "../components/Tabelas/Paginacao";
import Store from "../redux/Store";
import { toast } from "react-hot-toast";
import {
  detalharCliente,
  limparClienteDetalhe,
} from "../redux/acoes/acoesCliente";
import httpRequest from "../utils/httpRequest";

const url = "cliente";
const prefixo = "cliente";

export const getClientes = async (params = {}) => {
  const { offset = 0, limite = limiteItemsPorPagina, ...outrosParams } = params;

  limparClienteDetalhe();

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
      detalharCliente(lista?.[0]);
    }
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const salvarCliente = async (dados = {}) => {
  try {
    const cliente = {
      ...dados,
      nomeSemPontuacao: gerarNomeSemPontuacao(dados?.nome),
    };

    if (dadoExiste(cliente?._id)) {
      await editarCliente(cliente);
      return null;
    }

    await criarCliente(cliente);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const editarCliente = async (cliente) => {
  try {
    const resposta = await httpRequest({
      url: `${url}/${cliente._id}`,
      method: "PATCH",
      body: cliente,
    });

    const { mensagem } = resposta;

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getClientes(parametrosBusca);

    toast.success(mensagem);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const criarCliente = async (cliente) => {
  try {
    const resposta = await httpRequest({
      url: `${url}`,
      method: "POST",
      body: cliente,
    });

    const { mensagem } = resposta;
    toast.success(mensagem);

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getClientes(parametrosBusca);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const removerCliente = async (id) => {
  if (!dadoExiste(id)) {
    toast.error("Não conseguimos identificar o cliente!");
    return null;
  }

  try {
    const resposta = await httpRequest({
      url: `${url}/${id}`,
      method: "DELETE",
    });

    const { mensagem } = resposta;

    toast.success(mensagem || "Cliente removido com sucesso!");

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    await getClientes(parametrosBusca);
    limparClienteDetalhe();
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const colunasTabelaClientes = [
  { name: "Nome", value: "nome" },
  { name: "Email", value: "email" },
  {
    name: "Telefone",
    value: "telefone",
    formatar: (item) => normalizarTelefone(item),
  },
  { name: "Observações", value: "observacoes" },
];

export const camposFormCliente = [
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
    label: "Email",
    name: "email",
  },
  {
    tamanhoGrid: { md: 7 },
    label: "Endereço",
    name: "endereco",
  },
  {
    tamanhoGrid: { md: 5 },
    label: "Data contrato",
    name: "dataContrato",
    tipo: "date",
    formatar: (item) => normalizarData(item?.dataContrato),
  },
  {
    tamanhoGrid: { md: 6 },
    label: "CPF/CNPJ",
    name: "cpfCnpj",
    mask: "cpfCnpj",
    formatar: (item) => normalizarDocumento(item?.cpfCnpj),
  },
  {
    tamanhoGrid: { md: 6 },
    label: "Telefone",
    name: "telefone",
    mask: "telefone",
    formatar: (item) => normalizarTelefone(item?.telefone),
  },
  {
    tamanhoGrid: { md: 12 },
    label: "Observações",
    name: "observacoes",
    rows: 3,
    filtravel: false,
  },
];
