import Store from "../redux/Store";

export const dispatcher = (type, payload) => Store.dispatch({ type, payload });

const diasDaSemana = {
  sunday: "Domingo",
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
};

export const obterDiaDaSemanaEmPortugues = (diaEmIngles) => {
  return diasDaSemana[diaEmIngles.toLowerCase()] || diaEmIngles;
};

export const dadoExiste = (dado) => {
  if (typeof dado === "string") {
    const dadoValido =
      dado !== "" &&
      dado?.trim() !== "" &&
      dado?.trim() !== "---" &&
      dado?.toUpperCase() !== "NÃO INFORMADO" &&
      dado?.toUpperCase() !== "NAO INFORMADO" &&
      dado?.toUpperCase() !== "NI" &&
      dado?.toUpperCase() !== "NULL" &&
      dado?.toUpperCase() !== "R$ 0,00" &&
      dado?.toUpperCase() !== "R$ 0.00" &&
      dado?.toUpperCase() !== "R$0.00" &&
      dado?.toUpperCase() !== "R$0,00" &&
      dado?.toUpperCase() !== "R$,00";

    if (dadoValido) return true;
    else return false;
  }
  if (dado !== undefined && dado != null) return true;
  return false;
};

export const limparPontuacaoTexto = (texto) =>
  texto?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "");

export const gerarNomeSemPontuacao = (texto) =>
  limparPontuacaoTexto(texto)?.toString()?.trim()?.toUpperCase();

export const gerarStringAleatoria = (tamanho = 6) => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";
  for (let i = 0; i < tamanho; i++) {
    resultado += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return resultado;
};

export const normalizarCPF = (cpf = "") =>
  dadoExiste(cpf)
    ? cpf?.length === 11
      ? cpf
          ?.replace(/\D/g, "")
          ?.replace(/(\d{5}|\d{0,5})(\d{3})(\d{3})(\d{2})/, "XXX.XX$2.$3-$4")
      : "CPF não é válido!"
    : "Não informado";

export const mascaras = { cpf: "###.###.###-##" };

export const separarPrimeiroNome = (nome = "") =>
  nome?.toString()?.trim()?.split(" ")?.[0];

export const calcularTempo = (dias) => {
  const anos = Math.floor(dias / 365);
  dias = dias % 365;

  const meses = Math.floor(dias / 30);
  dias = dias % 30;

  let resultado = [];

  if (anos > 0) resultado.push(`${anos} Ano${anos > 1 ? "s" : ""}`);
  if (meses > 0) resultado.push(`${meses} M${meses > 1 ? "eses" : "ês"}`);
  if (dias > 0) resultado.push(`${dias} Dia${dias > 1 ? "s" : ""}`);

  if (resultado.length > 1) {
    return (
      resultado.slice(0, -1).join(", ") +
      " e " +
      resultado[resultado.length - 1]
    );
  }

  return resultado.length ? resultado.join("") : "0 Dia";
};
