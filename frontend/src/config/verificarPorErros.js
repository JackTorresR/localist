import toast from "react-hot-toast";

const verificarPorErros = async (error) => {
  const codigoErro = error?.code;

  if (codigoErro === "auth/invalid-credential") {
    toast.error("Informações de acesso não encontradas!");
    return null;
  }

  if (codigoErro === "auth/user-not-found") {
    toast.error("Usuário não encontrado!");
    return null;
  }

  if (codigoErro === "auth/wrong-password") {
    toast.error("Senha incorreta!");
    return null;
  }

  if (codigoErro === "auth/email-already-in-use") {
    toast.error("Este email já está em uso!");
    return null;
  }

  if (codigoErro === "auth/invalid-email") {
    toast.error("Email inválido!");
    return null;
  }

  if (codigoErro === "auth/weak-password") {
    toast.error("A senha é muito fraca!");
    return null;
  }

  if (codigoErro === "auth/network-request-failed") {
    toast.error("Falha na conexão de rede!");
    return null;
  }

  if (codigoErro === "auth/too-many-requests") {
    toast.error("Muitas tentativas, tente novamente mais tarde!");
    return null;
  }

  if (codigoErro === "storage/unauthorized") {
    toast.error(
      "Você não tem permissão para acessar esse recurso de armazenamento!"
    );
    return null;
  }

  if (codigoErro === "storage/canceled") {
    toast.error("Upload cancelado!");
    return null;
  }

  if (codigoErro === "storage/unknown") {
    toast.error("Erro desconhecido no armazenamento!");
    return null;
  }

  toast.error("Ocorreu um erro: " + error?.message);
  return null;
};

export default verificarPorErros;
