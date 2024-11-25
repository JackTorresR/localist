import configs from "../config/config";

const httpRequest = async (props = {}) => {
  const { url, method = "GET", body = null, params = null } = props;

  try {
    const usuarioTexto = localStorage.getItem("usuario");
    const usuario = await JSON.parse(usuarioTexto || "{}");
    const token = usuario?.token;

    if (!token) {
      throw new Error("Usuário não autenticado!");
    }

    let urlCompleta = `${configs.API_URL}/${url}`;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      urlCompleta += `?${queryString}`;
    }

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(urlCompleta, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.mensagem || "Erro ao realizar a requisição!");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição HTTP:", error);
    throw error;
  }
};

export default httpRequest;
