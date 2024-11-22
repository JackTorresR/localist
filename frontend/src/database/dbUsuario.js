import { dadoExiste, dispatcher, gerarNomeSemPontuacao } from "../utils/utils";
import verificarPorErros from "../config/verificarPorErros";
import { limiteItemsPorPagina } from "../components/Tabelas/Paginacao";
import { toast } from "react-hot-toast";
import configs from "../config/config";
import {
  detalharUsuario,
  limparUsuarioDetalhe,
} from "../redux/acoes/acoesUsuario";

const prefixo = "usuario";

export const getUsuarios = async (params = {}) => {
  const { offset = 0, limite = limiteItemsPorPagina, ...outrosParams } = params;

  limparUsuarioDetalhe();

  const searchParams = new URLSearchParams({ offset, limit: limite });

  Object.entries(outrosParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(
      `${configs.API_URL}/usuario?${searchParams.toString()}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    if (!response.ok) {
      throw new Error("Erro ao listar usuários!");
    }

    const { lista, quantidade } = await response.json();

    const buscouLimitado = dadoExiste(params?.limite) || params?.limite === 0;
    if (buscouLimitado) return lista;

    const pagina = offset / limite;

    dispatcher(`${prefixo}/LISTAR`, { lista, pagina, quantidade });

    const filtrouAchouSoUm =
      Object.keys(outrosParams)?.length > 0 && quantidade === 1;

    if (filtrouAchouSoUm) {
      detalharUsuario(lista?.[0]);
    }
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const getUsuario = async (id) => {
  try {
    const resposta = await fetch(`${configs.API_URL}/usuario/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.mensagem || "Erro ao buscar usuário!");
    }

    detalharUsuario(resultado?.usuario);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const salvarUsuario = async (dados = {}) => {
  try {
    const usuario = {
      ...dados,
      nomeSemPontuacao: gerarNomeSemPontuacao(dados?.nome),
    };

    if (dadoExiste(usuario?._id)) {
      await editarUsuario(usuario);
      return null;
    }

    await criarUsuario(usuario);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const editarUsuario = async (usuario) => {
  try {
    const url = `${configs.API_URL}/usuario/${usuario._id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error("Erro ao editar usuário!");
    }

    const { mensagem, usuarioAtualizado } = await response.json();

    detalharUsuario(usuarioAtualizado);
    toast.success(mensagem);
    window.history.back();
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const criarUsuario = async (usuario) => {
  try {
    const url = `${configs.API_URL}/usuario`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.mensagem);
    }

    const data = await response.json();
    toast.success(data.mensagem);
    window.history.go("/usuario");
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const removerUsuario = async (id) => {
  if (!dadoExiste(id)) {
    toast.error("Não conseguimos identificar o usuário!");
    return null;
  }

  try {
    const resposta = await fetch(`${configs.API_URL}/usuario/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      toast.error(resultado.mensagem || "Erro ao remover usuário!");
      return;
    }

    await getUsuarios();
    limparUsuarioDetalhe();

    toast.success(resultado.mensagem || "Usuário removido com sucesso!");
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const alterarSenhaUsuario = async (dados) => {
  try {
    const { usuarioId, senhaAtual, novaSenha } = dados;

    const url = `${configs.API_URL}/usuario/editar-senha`;

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId, senhaAtual, novaSenha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.mensagem || "Erro ao alterar senha!");
    }

    const { mensagem } = await response.json();
    toast.success(mensagem || "Senha alterada com sucesso!");
    window.location.href = "/cliente";
  } catch (erro) {
    verificarPorErros(erro);
  }
};
