import verificarPorErros from "../config/verificarPorErros";
import { dadoExiste, dispatcher } from "../utils/utils";
import toast from "react-hot-toast";
import configs from "../config/config";
import { fecharModal } from "../redux/acoes/acoesModal";

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

  const usuarioSalvo = JSON.parse(usuarioTexto || {});

  try {
    const resposta = await fetch(`${configs.API_URL}/usuario/validar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${usuarioSalvo?.token}`,
        "Content-Type": "application/json",
      },
    });

    const dados = await resposta.json();
    const { mensagem, usuario } = dados;

    if (!resposta.ok) {
      sairDoSistema();
      throw new Error(mensagem);
    }

    dispatch({ type: `${prefixo}/ACESSAR_AUTOMATICAMENTE`, payload: usuario });
  } catch (erro) {
    sairDoSistema();
    toast.error(erro.message || "Erro ao autenticar automaticamente!");
    return false;
  }
};

export const sairDoSistema = async () => {
  try {
    dispatcher(`${prefixo}/SAIR`);
    fecharModal();
  } catch (erro) {
    verificarPorErros(erro);
  }
};
