import { dadoExiste, dispatcher, gerarNomeSemPontuacao } from "../utils/utils";
import verificarPorErros from "../config/verificarPorErros";
import { limiteItemsPorPagina } from "../components/Tabelas/Paginacao";
import { toast } from "react-hot-toast";
import configs from "../config/config";
import {
  detalharAreaDepartamento,
  limparAreaDepartamentoDetalhe,
} from "../redux/acoes/acoesAreaDepartamento";

const prefixo = "areaDepartamento";

export const getAreasDepartamentos = async (params = {}) => {
  const { offset = 0, limite = limiteItemsPorPagina, ...outrosParams } = params;

  limparAreaDepartamentoDetalhe();

  const searchParams = new URLSearchParams({ offset, limit: limite });

  Object.entries(outrosParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(
      `${configs.API_URL}/area-departamento?${searchParams.toString()}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    if (!response.ok) {
      throw new Error("Erro ao listar áreas/departamentos!");
    }

    const { lista, quantidade } = await response.json();

    const buscouLimitado = dadoExiste(params?.limite) || params?.limite === 0;
    if (buscouLimitado) return lista;

    const pagina = offset / limite;

    dispatcher(`${prefixo}/LISTAR`, { lista, pagina, quantidade });

    const filtrouAchouSoUm =
      Object.keys(outrosParams)?.length > 0 && quantidade === 1;

    if (filtrouAchouSoUm) {
      detalharAreaDepartamento(lista?.[0]);
    }
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const getAreaDepartamento = async (id) => {
  try {
    const resposta = await fetch(`${configs.API_URL}/area-departamento/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(
        resultado.mensagem || "Erro ao buscar área/departamento!"
      );
    }

    detalharAreaDepartamento(resultado?.areaDepartamento);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const salvarAreaDepartamento = async (dados = {}) => {
  try {
    const areaDepartamento = {
      ...dados,
      nomeSemPontuacao: gerarNomeSemPontuacao(dados?.nome),
    };

    if (dadoExiste(areaDepartamento?._id)) {
      await editarAreaDepartamento(areaDepartamento);
      return null;
    }

    await criarAreaDepartamento(areaDepartamento);
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const editarAreaDepartamento = async (areaDepartamento) => {
  try {
    const url = `${configs.API_URL}/area-departamento/${areaDepartamento._id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(areaDepartamento),
    });

    if (!response.ok) {
      throw new Error("Erro ao editar área/departamento!");
    }

    const { mensagem, areaDepartamentoAtualizado } = await response.json();

    detalharAreaDepartamento(areaDepartamentoAtualizado);
    toast.success(mensagem);
    window.history.back();
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const criarAreaDepartamento = async (areaDepartamento) => {
  try {
    const url = `${configs.API_URL}/area-departamento`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(areaDepartamento),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.mensagem);
    }

    const data = await response.json();
    toast.success(data.mensagem);
    window.history.go("/area-departamento");
  } catch (erro) {
    verificarPorErros(erro);
  }
};

export const removerAreaDepartamento = async (id) => {
  if (!dadoExiste(id)) {
    toast.error("Não conseguimos identificar a área/departamento!");
    return null;
  }

  try {
    const resposta = await fetch(`${configs.API_URL}/area-departamento/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      toast.error(resultado.mensagem || "Erro ao remover área/departamento!");
      return;
    }

    await getAreasDepartamentos();
    limparAreaDepartamentoDetalhe();

    toast.success(
      resultado.mensagem || "Área/Departamento removido com sucesso!"
    );
  } catch (erro) {
    verificarPorErros(erro);
  }
};
