import verificarPorErros from "../config/verificarPorErros";
import { dadoExiste, dispatcher } from "../utils/utils";
import toast from "react-hot-toast";
import configs from "../config/config";

const prefixo = "auth";

export const acessarSistema = async ({ usuario, senha }) => {
  const naoTemDados = !(dadoExiste(usuario) || dadoExiste(senha));
  if (naoTemDados) {
    toast.error("Informe usuário e senha, por favor!");
    return null;
  }

  try {
    const response = await fetch(`${configs.API_URL}/usuario/acesso`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    });

    const retorno = await response.json();
    const { mensagem, dadosUsuario } = retorno;
    if (!response.ok) {
      if (!mensagem) {
        throw new Error("Falha ao tentar acessar o sistema");
      }

      toast.error(mensagem);
      return null;
    }

    dispatcher(`${prefixo}/ACESSAR`, dadosUsuario);
    toast.success(mensagem);
  } catch (erro) {
    console.error("Erro ao acessar o sistema:", erro);
    toast.error("Erro ao tentar acessar o sistema!");
  }
};

export const acessoAutomatico = async (dispatch) => {
  const usuarioTexto = localStorage.getItem("usuario");
  if (!usuarioTexto) return false;

  const usuario = JSON.parse(usuarioTexto || {});

  try {
    const resposta = await fetch(`${configs.API_URL}/usuario/validar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${usuario?.token}`,
        "Content-Type": "application/json",
      },
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      sairDoSistema();
      throw new Error(dados.mensagem);
    }

    dispatch({ type: `${prefixo}/ACESSAR_AUTOMATICAMENTE` });
  } catch (erro) {
    sairDoSistema();
    toast.error(erro.message || "Erro ao autenticar automaticamente!");
    return false;
  }
};

export const sairDoSistema = async () => {
  try {
    dispatcher(`${prefixo}/SAIR`);
  } catch (erro) {
    verificarPorErros(erro);
  }
};
