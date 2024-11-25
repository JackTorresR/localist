import {
  dadoExiste,
  dispatcher,
  gerarNomeSemPontuacao,
  normalizarDocumento,
  normalizarTelefone,
} from "../utils/utils";
import verificarPorErros from "../config/verificarPorErros";
import { limiteItemsPorPagina } from "../components/Tabelas/Paginacao";
import Store from "../redux/Store";
import { toast } from "react-hot-toast";
import configs from "../config/config";
import {
  detalharCliente,
  limparClienteDetalhe,
} from "../redux/acoes/acoesCliente";

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
    const response = await fetch(
      `${configs.API_URL}/cliente?${searchParams.toString()}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    if (!response.ok) {
      throw new Error("Erro ao listar clientes!");
    }

    const { lista, quantidade } = await response.json();

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

export const getCliente = async (id) => {
  try {
    const resposta = await fetch(`${configs.API_URL}/cliente/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.mensagem || "Erro ao buscar cliente!");
    }

    detalharCliente(resultado?.cliente);
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
    const url = `${configs.API_URL}/cliente/${cliente._id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });

    if (!response.ok) {
      throw new Error("Erro ao editar cliente!");
    }

    const { mensagem } = await response.json();

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
    const url = `${configs.API_URL}/cliente`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.mensagem);
    }

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getClientes(parametrosBusca);

    const data = await response.json();
    toast.success(data.mensagem);
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
    const resposta = await fetch(`${configs.API_URL}/cliente/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      toast.error(resultado.mensagem || "Erro ao remover cliente!");
      return null;
    }

    await getClientes();
    limparClienteDetalhe();

    toast.success(resultado.mensagem || "Cliente removido com sucesso!");
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const salvarImagemCliente = async (evento) => {
  const arquivos = evento.target.files;
  if (!arquivos?.length) return null;

  const tiposPermitidos = ["image/jpeg", "image/jpg", "image/png"];
  const arquivosValidos = [...arquivos].filter((arquivo) =>
    tiposPermitidos.includes(arquivo.type)
  );
  if (!arquivosValidos.length) {
    toast.error("Por favor, envie apenas arquivos JPG ou PNG!");
    return null;
  }

  try {
    const clienteId = Store.getState()?.cliente?.detalhe?._id;

    for (const arquivo of arquivosValidos) {
      const formData = new FormData();
      formData.append("file", arquivo);

      const resposta = await fetch(
        `${configs.API_URL}/arquivos/enviar-arquivo?nomePasta=clientes&idCliente=${clienteId}`,
        { method: "POST", body: formData }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.mensagem || "Erro ao salvar imagem!");
      }

      await getCliente(clienteId);
      toast.success("Imagem salva com sucesso!");
    }
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const removerImagemCliente = async (idCliente, nomeImagem) => {
  try {
    const url = `${configs.API_URL}/arquivos/cliente/${idCliente}/${nomeImagem}`;
    const resposta = await fetch(url, { method: "DELETE" });

    if (!resposta.ok) {
      throw new Error(resposta?.mensagem || "Erro ao remover a imagem!");
    }

    getCliente(idCliente);
    toast.success("Imagem removida com sucesso!");
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
    tamanhoGrid: { md: 12 },
    label: "Endereço",
    name: "endereco",
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
