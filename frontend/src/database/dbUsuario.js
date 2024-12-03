import {
  checarPermissao,
  dadoExiste,
  dispatcher,
  gerarNomeSemPontuacao,
} from "../utils/utils";
import verificarPorErros from "../config/verificarPorErros";
import { limiteItemsPorPagina } from "../components/Tabelas/Paginacao";
import { toast } from "react-hot-toast";
import { limparUsuarioDetalhe } from "../redux/acoes/acoesUsuario";
import Store from "../redux/Store";
import httpRequest from "../utils/httpRequest";

const prefixoPermissao = "USUARIO";
const url = "usuario";
const prefixo = "usuario";

export const getUsuarios = async (params = {}) => {
  const { offset = 0, limite = limiteItemsPorPagina, ...outrosParams } = params;

  const semPermissaoAcao = !checarPermissao(`${prefixoPermissao}_LISTAR`);
  if (semPermissaoAcao) {
    toast.error("Você não possuí permissão de listagem!");
    return null;
  }

  limparUsuarioDetalhe();

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
    const semPermissaoAcao = !checarPermissao(`${prefixoPermissao}_EDITAR`);
    if (semPermissaoAcao) {
      toast.error("Você não possuí permissão de edição!");
      return null;
    }

    const resposta = await httpRequest({
      url: `${url}/${usuario._id}`,
      method: "PATCH",
      body: usuario,
    });

    const { mensagem } = resposta;

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    await getUsuarios(parametrosBusca);

    toast.success(mensagem);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const criarUsuario = async (usuario) => {
  try {
    const semPermissaoAcao = !checarPermissao(`${prefixoPermissao}_CRIAR`);
    if (semPermissaoAcao) {
      toast.error("Você não possuí permissão de criar!");
      return null;
    }

    const resposta = await httpRequest({
      url: `${url}`,
      method: "POST",
      body: usuario,
    });

    const { mensagem } = resposta;
    toast.success(mensagem);

    const parametrosBusca =
      Store?.getState()?.parametroBusca?.["filtro-modal-form"] || {};

    getUsuarios(parametrosBusca);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const removerUsuario = async (id) => {
  const semPermissaoAcao = !checarPermissao(`${prefixoPermissao}_DELETAR`);
  if (semPermissaoAcao) {
    toast.error("Você não possuí permissão de remover registro!");
    return null;
  }

  if (!dadoExiste(id)) {
    toast.error("Não conseguimos identificar o usuário!");
    return null;
  }

  try {
    const resposta = await httpRequest({
      url: `${url}/${id}`,
      method: "DELETE",
    });

    const { mensagem } = resposta;

    toast.success(mensagem || "Usuário removido com sucesso!");

    await getUsuarios();
    limparUsuarioDetalhe();
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const alterarSenhaUsuario = async (dados) => {
  try {
    const semPermissaoAcao = !checarPermissao(`${prefixoPermissao}_ALTERAR_SENHA`);
    if (semPermissaoAcao) {
      toast.error("Você não possuí permissão de alterar senha!");
      return null;
    }

    const resposta = await httpRequest({
      url: `${url}/editar-senha`,
      method: "PUT",
      body: dados,
    });

    const { mensagem } = resposta;
    toast.success(mensagem || "Senha alterada com sucesso!");

    window.location.href = "/caixa-arquivo";
  } catch (erro) {
    verificarPorErros(erro);
  }
};
